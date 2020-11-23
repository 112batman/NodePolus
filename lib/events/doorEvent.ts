import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { MapRoom, Door } from "../util/MapRooms";

export class DoorEvent extends BaseEvent {
  constructor(public player: Player, public room: MapRoom, public door: Door) {
    super();
  }
}
