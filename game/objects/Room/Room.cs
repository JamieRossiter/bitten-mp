using Godot;
using System.Collections.Generic;

public partial class Room : Node
{

    private int maxPlayers;
    private string code;

    public string Code { get; }

    public void SetCode(string code)
    {
        this.code = code;
    }

}
