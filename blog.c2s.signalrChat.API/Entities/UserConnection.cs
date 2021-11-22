namespace blog.c2s.signalrChat.Entities
{
    public class UserConnection
    {
        private string _user;
        private string _room;

        public string User { get { return _user; } set { _user = value.TrimStart().TrimEnd(); } }
        public string Room { get { return _room; } set { _room = value.TrimStart().TrimEnd(); } }
    }
}
