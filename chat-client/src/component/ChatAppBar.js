import { SymbolInvtation } from "./anncounce/Invitations";
const ChatAppBar = ({socket}) => {
    return(<div>
            <SymbolInvtation socket={socket}/>
         </div>);
}

export default ChatAppBar;

