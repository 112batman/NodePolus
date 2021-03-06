import { RoomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface JoinedGamePacket {
  type: "JoinedGame";
  RoomCode: string;
  PlayerClientID: number;
  HostClientID: number;
  PlayerCount?: number;
  OtherPlayers: number[];
}

export const JoinedGame: PacketHandler<JoinedGamePacket> = {
  parse(packet: PolusBuffer): JoinedGamePacket {
    const code = RoomCode.decode(packet.read32());
    const playerClientId = packet.readU32();
    const hostClientId = packet.readU32();
    const playerCount = packet.readVarInt();

    const baseObject: JoinedGamePacket = {
      type: "JoinedGame",
      RoomCode: code,
      PlayerClientID: playerClientId,
      HostClientID: hostClientId,
      PlayerCount: playerCount,
      OtherPlayers: [],
    };

    for (let i = 0; i < playerCount; i++) {
      baseObject.OtherPlayers.push(packet.readVarInt());
    }
    return baseObject;
  },

  serialize(packet: JoinedGamePacket): PolusBuffer {
    var buf = new PolusBuffer(12);
    buf.write32(RoomCode.encode(packet.RoomCode));
    buf.writeU32(packet.PlayerClientID);
    buf.writeU32(packet.HostClientID);
    buf.writeVarInt(packet.OtherPlayers.length);
    for (let i = 0; i < packet.OtherPlayers.length; i++) {
      buf.writeVarInt(packet.OtherPlayers[i]);
    }
    return buf;
  },
};
