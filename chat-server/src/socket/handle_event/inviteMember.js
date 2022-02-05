const socketEvent = require("../events");
const { UserModel, RoomModel } = require("../../models");

const inviteMember = (io, socket) => {

    socket.on(socketEvent.inviteMember, async (data) => {
        try {
            const users = await UserModel.find({ email: data.email });
            const room = await RoomModel.findById(data.room_id);
            const user = await UserModel.findById(socket.user_id);
            room.invitedUsers = [users[0]._id.toString(), ...room.invitedUsers];
            room.save();
            users[0].accessible = [{ room_id: data.room_id, roomname: room.roomname, from: user.email, _at: Date.now() }, ...users[0].accessible];
            users[0].save();
            if (users[0].online = true) {
                io.to(users[0]._id.toString()).emit(socketEvent.invite, { room_id: data.room_id, roomname: room.roomname, from: user.email, _at: Date.now() });
            }
        }
        catch (err) {

        }
    });

    socket.on(socketEvent.acceptJoinRoom, async (data) => {
        const room_id = data.room_id;
        const room = await RoomModel.findById(room_id);
        const user = await UserModel.findById(socket.user_id);
        socket.join(room._id.toString());                
        socket.emit(socketEvent.joinRoom, room);
        io.to(room_id).emit(socketEvent.updateMemberInfo,{_id:user._id,email : user.email, avatar:user.avatar, username:user.username, online:user.online});
        user.rooms = [room_id, ...user.rooms];
        user.accessible = user.accessible.filter((acc) => acc.room_id !== room_id);
        user.save();
        room.members = [socket.user_id, ...room.members];
        room.invitedUsers = room.invitedUsers.filter((_id) => _id !== socket.user_id);
        room.save(); 
        });


}

module.exports = inviteMember;