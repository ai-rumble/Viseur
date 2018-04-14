// This is a class to represent the Port object in the game.
// If you want to render it in the game do so here.
import { MenuItems } from "src/core/ui/context-menu";
import { Viseur } from "src/viseur";
import { IDeltaReason } from "src/viseur/game";
import { Game } from "./game";
import { GameObject } from "./game-object";
import { IPortState } from "./state-interfaces";

// <<-- Creer-Merge: imports -->>
import * as Color from "color";
import { Player } from "./player";
// any additional imports you want can be added here safely between Creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * An object in the game. The most basic class that all game classes should
 * inherit from automatically.
 */
export class Port extends GameObject {
    // <<-- Creer-Merge: static-functions -->>
    // you can add static functions here
    // <<-- /Creer-Merge: static-functions -->>

    /**
     * Change this to return true to actually render instances of super classes
     * @returns true if we should render game object classes of this instance,
     *          false otherwise which optimizes playback speed
     */
    public get shouldRender(): boolean {
        // <<-- Creer-Merge: should-render -->>
        return true; // change this to true to render all instances of this class
        // <<-- /Creer-Merge: should-render -->>
    }

    /** The instance of the game this game object is a part of */
    public readonly game!: Game; // set in super constructor

    /** The current state of the Port (dt = 0) */
    public current: IPortState | undefined;

    /** The next state of the Port (dt = 1) */
    public next: IPortState | undefined;

    // <<-- Creer-Merge: variables -->>
    public owner?: Player;

    public sprite: PIXI.Sprite;
    public rotatedSprite: PIXI.Sprite;
    public portColor: PIXI.Sprite;
    public rotatedPortColor: PIXI.Sprite;
    // You can add additional member variables here
    // <<-- /Creer-Merge: variables -->>

    /**
     * Constructor for the Port with basic logic as provided by the Creer
     * code generator. This is a good place to initialize sprites and constants.
     * @param state the initial state of this Port
     * @param Visuer the Viseur instance that controls everything and contains
     * the game.
     */
    constructor(state: IPortState, viseur: Viseur) {
        super(state, viseur);

        // <<-- Creer-Merge: constructor -->>
        if (state.owner) {
            this.owner = this.game.gameObjects[state.owner.id] as Player;
        }

        this.container.setParent(this.game.layers.port);

        this.sprite = this.game.resources.port.newSprite(this.container);
        this.sprite.visible = false;

        this.rotatedSprite = this.game.resources.rotatedPort.newSprite(this.container);
        this.rotatedSprite.visible = false;

        this.portColor = this.game.resources.portColor.newSprite(this.container);
        this.portColor.blendMode = 2;
        this.portColor.alpha = .75;
        this.portColor.visible = false;

        this.rotatedPortColor = this.game.resources.rotatedPortColor.newSprite(this.container);
        this.rotatedPortColor.blendMode = 2;
        this.rotatedPortColor.alpha = .75;
        this.rotatedPortColor.visible = false;

        this.container.position.set(state.tile.x, state.tile.y);

        this.recolor();
        // You can initialize your new Port here.
        // <<-- /Creer-Merge: constructor -->>
    }

    /**
     * Called approx 60 times a second to update and render Port
     * instances. Leave empty if it is not being rendered.
     * @param dt a floating point number [0, 1) which represents how
     * far into the next turn that current turn we are rendering is at
     * @param current the current (most) state, will be this.next if
     * this.current is undefined
     * @param next the next (most) state, will be this.current if
     * this.next is undefined
     * @param reason the reason for the current delta
     * @param nextReason the reason for the next delta
     */
    public render(dt: number, current: IPortState, next: IPortState,
                  reason: IDeltaReason, nextReason: IDeltaReason): void {
        super.render(dt, current, next, reason, nextReason);

        // <<-- Creer-Merge: render -->>
        this.sprite.visible = true;
        this.rotatedSprite.visible = false;
        this.portColor.visible = true;
        this.rotatedPortColor.visible = false;
        if (this.current && this.current.tile && this.current.tile.tileEast && this.current.tile.tileWest) {
            if (this.current.tile.tileEast.type === "water" && this.current.tile.tileWest.type === "water") {
                this.rotatedSprite.visible = true;
                this.rotatedPortColor.visible = true;
                this.portColor.visible = false;
                this.sprite.visible = false;
            }
        }
        this.container.visible = Boolean(next.tile);

        // render where the Port is
        // <<-- /Creer-Merge: render -->>
    }

    /**
     * Invoked after when a player changes their color, so we have a
     * chance to recolor this Port's sprites.
     */
    public recolor(): void {
        super.recolor();

        // <<-- Creer-Merge: recolor -->
        if (!this.owner) {
            const white = Color("white");
            this.portColor.tint = white.rgbNumber();
            this.rotatedPortColor.tint = white.rgbNumber();
            return;
        }
        const ownerColor = this.game.getPlayersColor(this.owner);
        this.portColor.tint = ownerColor.rgbNumber();
        this.rotatedPortColor.tint = ownerColor.rgbNumber();
        // replace with code to recolor sprites based on player color
        // <<-- /Creer-Merge: recolor -->>
    }

    /**
     * Invoked when the state updates.
     * @param current the current (most) state, will be this.next if
     * this.current is undefined
     * @param next the next (most) game state, will be this.current if
     * this.next is undefined
     * @param reason the reason for the current delta
     * @param nextReason the reason for the next delta
     */
    public stateUpdated(current: IPortState, next: IPortState,
                        reason: IDeltaReason, nextReason: IDeltaReason): void {
        super.stateUpdated(current, next, reason, nextReason);

        // <<-- Creer-Merge: state-updated -->>
        // update the Port based off its states
        // <<-- /Creer-Merge: state-updated -->>
    }

    // <<-- Creer-Merge: public-functions -->>
    // You can add additional public functions here
    // <<-- /Creer-Merge: public-functions -->>

    // NOTE: past this block are functions only used 99% of the time if
    //       the game supports human playable clients (like Chess).
    //       If it does not, feel free to ignore everything past here.

    // <Joueur functions> --- functions invoked for human playable client

    /**
     * Spawn a Unit on this port.
     * @param type What type of Unit to create ('crew' or 'ship').
     * @param callback? The callback that eventually returns the return value
     * from the server. - The returned value is True if Unit was created
     * successfully, false otherwise.
     */
    public spawn(type: string, callback?: (returned: boolean) => void): void {
        this.runOnServer("spawn", {type}, callback);
    }

    // </Joueur functions>

    /**
     * Invoked when the right click menu needs to be shown.
     * @returns an array of context menu items, which can be
     *          {text, icon, callback} for items, or "---" for a separator
     */
    protected getContextMenu(): MenuItems {
        const menu = super.getContextMenu();

        // <<-- Creer-Merge: get-context-menu -->>
        // add context items to the menu here
        // <<-- /Creer-Merge: get-context-menu -->>

        return menu;
    }

    // <<-- Creer-Merge: protected-private-functions -->>
    // You can add additional protected/private functions here
    // <<-- /Creer-Merge: protected-private-functions -->>
}