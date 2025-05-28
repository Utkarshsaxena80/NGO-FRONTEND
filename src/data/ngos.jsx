

import {ethers,BrowserProvider} from 'ethers';
import ABI from '../components/abi1';

async function allNgoData(){
  const add="0xE1618DBC504B4bF56A470E46e6607bE9ea8AC779";//change to manual
  let mainContract;
  if(!add){
    console.log("no contract address found ");
    return [];
  }
  try{
         const provider= new BrowserProvider(window.ethereum);
         const signer= await provider.getSigner();
               mainContract= new ethers.Contract(add,ABI,signer);
           const ngoArrayRaw= await mainContract.getAllNGOData();

           const ngoArray=ngoArrayRaw.map((ngo)=>({
      mainAddress: ngo.mainAddress,
      isRegistered: ngo.isRegistered,
      TYPE: ngo.TYPE,
      isActive: ngo.isActive,
      preferredChain: ngo.preferredChain,
      chainId: Number(ngo.chainId),
      imageOfIPFS: ngo.imageOfIPFS,
      descriptionOfNGO: ngo.descriptionOfNGO,
      ownerName: ngo.ownerName,
      totalMoneyRaised: ethers.formatEther(ngo.totalMoneyRaised),
  }))
  console.log(ngoArray);
  return ngoArray;
  }catch(error){
    console.error(error);
    return [];

  }
}
export default allNgoData;