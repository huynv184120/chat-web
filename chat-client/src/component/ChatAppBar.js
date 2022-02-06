import { SymbolInvtation } from "./anncounce/Invitations";
import {SymbolMyInfo} from "./user/MyInfo";
import {SymbolNotification} from "./anncounce/Notifitation";
const ChatAppBar = ({socket}) => {
    return(<div>
            <SymbolInvtation socket={socket}/>
            <SymbolMyInfo/>
            <SymbolNotification/>
         </div>);
}

export default ChatAppBar;

