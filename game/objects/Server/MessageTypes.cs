namespace MessageTypes 
{
    // A generic incoming JSON message
    public struct IncomingMessage
    {
        public string Event { get; set; }
        public string Message { get; set; }
    }

    public struct RoomNoExistMessage
    {
        public string RoomCode { get; set; }
    }

    public struct PlayerJoinedRoomMesage
    {
        public string PlayerId { get; set; }
        public string PlayerUsername { get; set; }
        public string RoomCode { get; set; }
    }
}


