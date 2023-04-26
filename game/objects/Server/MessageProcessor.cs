using Godot;
using System;

public partial class MessageProcessor : Node
{

    public void ProcessIncomingMessage(string message)
    {
        GD.Print(message);
    }

}
