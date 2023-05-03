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

    public struct RoomInformationMessage
    {
        public string RoomCode { get; set; }
        public string[] RoomPlayers { get; set; } 
    }

    public struct PlayerJoinedRoomMessage
    {
        public string PlayerId { get; set; }
        public string PlayerUsername { get; set; }
        public string RoomCode { get; set; }
    }

    public struct PlayerLeftRoomMessage
    {
        public string PlayerId { get; set; }
        public string PlayerUsername { get; set; }
        public int DisconnectCode { get; set; }
        public string DisconnectMessage { get; set; }
    }
}


