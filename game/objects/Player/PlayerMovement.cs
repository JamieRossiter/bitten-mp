using Godot;
using System.Collections.Generic;

public partial class PlayerMovement : Node
{

    private Player parent;
	private Vector2 targetVelocity = Vector2.Zero;

	[Export]
	public int Speed {get; set;} = 300;

    public override void _Ready()
    {
        this.parent = (Player)this.GetParent();
    }

    public override void _PhysicsProcess(double delta)
    {
		this.targetVelocity = Vector2.Zero;

		this.HandleMovement();
		this.targetVelocity = this.targetVelocity.Normalized() * this.Speed;

		parent.Velocity = this.targetVelocity; // Set velocity of CharacterBody2D to target velocity
		parent.MoveAndSlide(); // Move CharacterBody2D
    }

    private void HandleMovement()
	{
		if(parent.Directions["east"])
		{
			this.targetVelocity.X += 1.0f;
		}
		if(parent.Directions["west"])
		{
			this.targetVelocity.X -= 1.0f;
		}
		if(parent.Directions["south"])
		{
			this.targetVelocity.Y += 1.0f;
		}
		if(parent.Directions["north"])
		{
			this.targetVelocity.Y -= 1.0f;
		}
	}

}
