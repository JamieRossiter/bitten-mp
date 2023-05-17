using Godot;
using System.Collections.Generic;

public partial class PlayerAnimation : Node
{

    private Player parent;
	private AnimatedSprite2D animatedSprite;
	private bool isMoving;

    public override void _Ready()
    {
		this.parent = (Player)this.GetParent();
        this.animatedSprite = (AnimatedSprite2D)parent.GetNode("AnimatedSprite2D");
    }

    public override void _PhysicsProcess(double delta)
    {
        this.HandleAnimation();
		this.HandleSpriteAnimation();
    }

    	private void HandleAnimation()
	{
		// Handle diagonal directions
		if(parent.Directions["northeast"] || parent.Directions["northwest"] || parent.Directions["southeast"] || parent.Directions["southwest"])
		{
			if(parent.Directions["southeast"] || parent.Directions["southwest"])
			{
				animatedSprite.Animation = "south";
			}
			if(parent.Directions["northeast"] || parent.Directions["northwest"])
			{
				animatedSprite.Animation = "north";
			}
		} else // Handle normal directions
		{
			if(parent.Directions["east"])
			{
				animatedSprite.Animation = "east";
			} 
			else if(parent.Directions["west"])
			{
				animatedSprite.Animation = "west";
			}
			else if(parent.Directions["north"])
			{
				animatedSprite.Animation = "north";
			}
			else if(parent.Directions["south"])
			{
				animatedSprite.Animation = "south";
			}
		}
	}

    private void HandleSpriteAnimation()
	{
		this.isMoving = ( parent.Directions["east"] || parent.Directions["west"] || parent.Directions["south"] || parent.Directions["north"] );

		if(this.isMoving)
		{
			animatedSprite.Play();
		} else
		{
			animatedSprite.Stop();
			animatedSprite.Frame = 1; // Set default standing frame
		}
	}

}
