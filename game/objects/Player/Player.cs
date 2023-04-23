using Godot;
using System.Collections.Generic;

public partial class Player : CharacterBody2D
{
	// Animation
	private AnimatedSprite2D animatedSprite;
	private bool isMoving;
	// Movement
	private Dictionary<string, bool> directions;
	private Vector2 targetVelocity = Vector2.Zero;
	[Export]
	public int Speed {get; set;} = 300;

	public override void _Ready()
	{
		this.directions = this.CreateDirectionsDictionary();
		this.animatedSprite = (AnimatedSprite2D)GetNode("AnimatedSprite2D");
	}

	public override void _PhysicsProcess(double delta)
    {
		this.UpdateDirectionsDictionary();

		// Animation
        this.HandleAnimation();
		this.HandleSpriteAnimation();

		// Movement
		this.targetVelocity = Vector2.Zero;

		this.HandleMovement();
		this.targetVelocity = this.targetVelocity.Normalized() * this.Speed;

		this.Velocity = this.targetVelocity; // Set velocity of CharacterBody2D to target velocity
		this.MoveAndSlide(); // Move CharacterBody2D
    }

	private void HandleMovement()
	{
		if(this.directions["east"])
		{
			this.targetVelocity.X += 1.0f;
		}
		if(this.directions["west"])
		{
			this.targetVelocity.X -= 1.0f;
		}
		if(this.directions["south"])
		{
			this.targetVelocity.Y += 1.0f;
		}
		if(this.directions["north"])
		{
			this.targetVelocity.Y -= 1.0f;
		}
	}

	private void HandleAnimation()
	{
		// Handle diagonal directions
		if(this.directions["northeast"] || this.directions["northwest"] || this.directions["southeast"] || this.directions["southwest"])
		{
			if(this.directions["southeast"] || this.directions["southwest"])
			{
				animatedSprite.Animation = "south";
			}
			if(this.directions["northeast"] || this.directions["northwest"])
			{
				animatedSprite.Animation = "north";
			}
		} else // Handle normal directions
		{
			if(this.directions["east"])
			{
				animatedSprite.Animation = "east";
			} 
			else if(this.directions["west"])
			{
				animatedSprite.Animation = "west";
			}
			else if(this.directions["north"])
			{
				animatedSprite.Animation = "north";
			}
			else if(this.directions["south"])
			{
				animatedSprite.Animation = "south";
			}
		}
	}

    private void HandleSpriteAnimation()
	{
		this.isMoving = ( this.directions["east"] || this.directions["west"] || this.directions["south"] || this.directions["north"] );

		if(this.isMoving)
		{
			animatedSprite.Play();
		} else
		{
			animatedSprite.Stop();
			animatedSprite.Frame = 1; // Set default standing frame
		}
	}

	private Dictionary<string, bool> CreateDirectionsDictionary()
	{
		return new Dictionary<string, bool>(){
			{"east", Input.IsActionPressed("move_east")},
			{"west", Input.IsActionPressed("move_west")},
			{"north", Input.IsActionPressed("move_north")},
			{"south", Input.IsActionPressed("move_south")},
			{"northeast", Input.IsActionPressed("move_north") && Input.IsActionPressed("move_east")},
			{"northwest", Input.IsActionPressed("move_north") && Input.IsActionPressed("move_west")},
			{"southeast", Input.IsActionPressed("move_south") && Input.IsActionPressed("move_east")},
			{"southwest", Input.IsActionPressed("move_south") && Input.IsActionPressed("move_west")}
		};
	}

	private void UpdateDirectionsDictionary()
	{
		this.directions["east"] = Input.IsActionPressed("move_east");
		this.directions["west"] = Input.IsActionPressed("move_west");
		this.directions["north"] = Input.IsActionPressed("move_north");
		this.directions["south"] = Input.IsActionPressed("move_south");
		this.directions["northeast"] = Input.IsActionPressed("move_north") && Input.IsActionPressed("move_east");
		this.directions["northwest"] = Input.IsActionPressed("move_north") && Input.IsActionPressed("move_west");
		this.directions["southeast"] = Input.IsActionPressed("move_south") && Input.IsActionPressed("move_east");
		this.directions["southwest"] = Input.IsActionPressed("move_south") && Input.IsActionPressed("move_west");
	}

}



