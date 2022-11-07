import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { NFTs } from '../interface';
import {getShopWeaponList, updateCharacter, register, buyWeapon, getCurrentWeapon, getInventoryWeapon} from '../_aqua/crossgame_service' 

export default class FluenceController {

  constructor() {
    this.start()
  }

  private async start() {
    await Fluence.start({ connectTo: krasnodar[8] });
  }

  async getWeaponShop(weapons) {
    
    console.log("getWeaponShop")
    try{
      return await getShopWeaponList(weapons)
    }catch(e){
      return e
    }
    
  }

  async updateCharacterWeapon(walletAddress: string, weapon: string) {
    
    try{
      return await updateCharacter(walletAddress, weapon)
    }catch(e){
      return e
    }
    
  }

  async registration(walletAddress: string) {

    try{
        return await register(walletAddress)
      }catch(e){
        return e
      }
  }

  async buyWeapon(walletAddress: string, weapon: string) {

    try{
        return await buyWeapon(walletAddress, weapon)
      }catch(e){
        return e
      }
  }

  async getCurrentWeapon(walletAddress: string){
    try{
      return await getCurrentWeapon(walletAddress)
    }catch(e){
      return e
    }
  }

  async getInventory(walletAddress: string){
    try{
      console.log("walletAddress",walletAddress)
      return await getInventoryWeapon(walletAddress)
    }catch(e){
      return e
    }
  }
  
}