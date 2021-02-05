import axios from 'axios';
import { apis, getFullUrl } from "../apis";


 class ShareService {
    getShareList=async ()=>{
        const url = getFullUrl(apis.share.entry);
        const ret = await axios.get(url) 
        return ret&&ret.data&&ret.data.data;
    }

    updateShareList=async (schemas)=>{
        const url = getFullUrl(apis.share.entry,apis.share.updateUrl);
        const ret = await axios.post(url,schemas);
        return ret&&ret.data&&ret.data.data;
    }
}

export default new ShareService();