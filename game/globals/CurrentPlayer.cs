public static class CurrentPlayer {
    
    public static Player Obj { get; set; }
    
    public static string GetId()
    {
        if(Obj is null) return "";
        return Obj.Id;
    }

    public static string GetUsername()
    {
        if(Obj is null) return "";
        return Obj.Username;
    }
}