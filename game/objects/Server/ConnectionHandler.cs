using Godot;

public partial class ConnectionHandler : Node
{
    private WebSocketPeer socket = new WebSocketPeer();
    private WebSocketPeer.State socketState;
    private MessageProcessor messageProcessor;

    // FOR TESTING
    private string username = "jimothy";
    private string isHost = "true";
    private string roomName = "testRoom";

    [Export]
    public string ServerUrl {get; set;} = "ws://127.0.0.0";
    [Export]
    public string ServerPort {get; set;} = "5000";

    public override void _Ready()
    {
        this.messageProcessor = (MessageProcessor)this.GetNode("../MessageProcessor");
        
        Error connectionError = this.socket.ConnectToUrl($"{this.ServerUrl}:{this.ServerPort}/?username={this.username}&isHost={this.isHost}");        
        if(connectionError > 0)
        {
            this.HandleConnectionError(connectionError);
        }
    }

    public override void _Process(double delta)
    {
        this.PollSocket();
        this.HandleSocketStateChange();
    }

    private void PollSocket()
    {
        this.socket.Poll();
        this.socketState = this.socket.GetReadyState();
    }

    private void HandleConnectionError(Error error){
        GD.PrintErr(error);
    }

    private void HandleSocketStateChange()
    {

        switch(this.socketState){
            case WebSocketPeer.State.Open:
                // Check if there is available packet(s)
                while(socket.GetAvailablePacketCount() > 0)
                {   
                    this.HandleIncomingMessage(socket.GetPacket());
                }
                break;
            case WebSocketPeer.State.Closing:
                break;
            case WebSocketPeer.State.Closed:

                int closeCode = socket.GetCloseCode();
                string closeReason = socket.GetCloseReason();

                this.HandleSocketClose(closeCode, closeReason);
                this.SetProcess(false); // Stop processing

                break;
        }

    }

    private void HandleIncomingMessage(byte[] message)
    {
        string stringMessage = System.Text.Encoding.UTF8.GetString(message);
        this.messageProcessor.ProcessIncomingMessage(stringMessage);
    }

    private void HandleSocketClose(int code, string reason)
    {
        GD.PrintErr("Socket closed with code: " + code + ". Reason: " + reason);
    }

}
