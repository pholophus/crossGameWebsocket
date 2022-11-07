import express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import * as dotenv from 'dotenv';
import FluenceController from "./src/controller/fluence-controller"
import { NFTs } from "./src/interface";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: false
  }
});

const fluence = new FluenceController()

io.on("connection", (socket: any) => {

  socket.once('get_shop_weapon_list', async (weapons) => {
    
    try {
      let x: any = await fluence.getWeaponShop(weapons)
      
      socket.emit('output_weapon_shop', {
        func: 'get_shop_weapon_list',
        data: x
      })

    } catch(e) {
      console.log(e)
    }
    
  })

  socket.once('register_player', async (walletAddress: string) => {

    try {
      // console.log(game_url, "https://www.shutterstock.com/image-photo/fried-popcorn-chicken-isolated-on-white-1913069218", 32)
      let x: any = await fluence.registration(walletAddress)
      // let x: any = await fluence.onBoardGame(game_url, arcade_image, width
    //   socket.emit('output_onboard_game_location', {
    //     func: 'get_onboard_game_location',
    //     data: x
    //   })

    } catch(e) {
      console.log(e)
    }
    
  })

  socket.once('buy_weapon', async (walletAddress: string, weapon: string) => {

    try {
      // console.log(game_url, "https://www.shutterstock.com/image-photo/fried-popcorn-chicken-isolated-on-white-1913069218", 32)
      let x: any = await fluence.buyWeapon(walletAddress, weapon)

      socket.emit('output_buy_weapon', {
        func: 'buy_weapon',
        data: x[0]
      })

      let x1: any = await fluence.getInventory(walletAddress)

      console.log("data inventory", x)
      socket.emit('output_inventory_weapons', {
        func: 'get_inventory_weapons',
        data: x1[0]
      })

    } catch(e) {
      console.log(e)
    }
    
  })

  socket.once('update_character', async (walletAddress: string, weapon: string) => {

    try {
      // console.log(game_url, "https://www.shutterstock.com/image-photo/fried-popcorn-chicken-isolated-on-white-1913069218", 32)
      await fluence.updateCharacterWeapon(walletAddress, weapon)
      
      let x: any = await fluence.getCurrentWeapon(walletAddress)

      console.log("get current weapon after update character")

      socket.emit('output_current_weapon', {
        func: 'get current weapon after update character',
        data: x[0]
      })

    } catch(e) {
      console.log(e)
    }
    
  })

  socket.on('get_current_weapon', async (walletAddress: string) => {

    try {
      // console.log(game_url, "https://www.shutterstock.com/image-photo/fried-popcorn-chicken-isolated-on-white-1913069218", 32)
      let x: any = await fluence.getCurrentWeapon(walletAddress)

      console.log("get current weapon loading")

      socket.emit('output_current_weapon', {
        func: 'get current weapon loading',
        data: x[0]
      })

    } catch(e) {
      console.log(e)
    }
    
  })

  socket.once('get_inventory_weapons', async (walletAddress: string) => {

    try {
      console.log("walletAddress",walletAddress)
      // console.log(game_url, "https://www.shutterstock.com/image-photo/fried-popcorn-chicken-isolated-on-white-1913069218", 32)
      let x: any = await fluence.getInventory(walletAddress)

      console.log("data inventory", x)
      socket.emit('output_inventory_weapons', {
        func: 'get_inventory_weapons',
        data: x[0]
      })
      
    } catch(e) {
      console.log(e)
    }
    
  })
  
});

server.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});