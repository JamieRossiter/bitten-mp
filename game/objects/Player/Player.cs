using Godot;
using System.Collections.Generic;

public partial class Player : CharacterBody2D
{

	private Dictionary<string, bool> directions;


	public override void _Ready()
	{
		this.directions = this.CreateDirectionsDictionary();
	}

	public override void _PhysicsProcess(double delta)
    {
		this.UpdateDirectionsDictionary();
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

	public Dictionary<string, bool> Directions 
	{
		get 
		{
			return directions;
		}
	}

}



