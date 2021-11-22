using blog.c2s.signalrChat.Entities;
using Microsoft.AspNetCore.SignalR;

namespace blog.c2s.signalrChat.Hubs
{
    /// <summary>
    /// Service de gestion du chat
    /// </summary>
    public class ChatHub : Hub
    {
        /// <summary>
        /// Nom du serveur de chat
        /// </summary>
        private readonly string _botUser;
        /// <summary>
        /// Stockage des utilisateurs connectés : {Identifiant, {UserName, Room}}
        /// </summary>
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        /// <summary>
        /// Méthode permettant de gérer la déconnexion d'un utilisateur d'une salle
        /// </summary>
        /// <param name="exception">Exception généré par SignalR lors de la déconnexion</param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} a quitté le salon.");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Méthode permettant de rejoindre une salle de chat
        /// </summary>        
        /// <returns></returns>
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await SendBotMessage(userConnection, $"{userConnection.User} vient de se connecter dans \"{userConnection.Room}\".");

            await SendUsersConnected(userConnection.Room);
        }

        /// <summary>
        /// Message permettant au bot d'envoyer un message
        /// </summary>
        /// <param name="userConnection"></param>
        /// <returns></returns>
        private async Task SendBotMessage(UserConnection userConnection, string message)
        {
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", null, _botUser, message, DateTime.Now.ToString("G"));
        }

        /// <summary>
        /// Message permettant d'envoyer un message dans une salle de chat
        /// </summary>
        /// <param name="message">Message à envoyer</param>
        /// <returns></returns>
        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", Context.ConnectionId, userConnection.User, message, DateTime.Now.ToString("G"));
            }
        }

        /// <summary>
        /// Méthode permettant de renvoyer la liste des utilisateurs connectés dans une salle de chat
        /// </summary>
        /// <param name="room"></param>
        /// <returns></returns>
        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
