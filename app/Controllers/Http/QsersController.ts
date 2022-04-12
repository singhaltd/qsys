import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Qservice from 'App/Models/Qservice';
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
import Ws from 'App/Services/Ws'
import { schema } from '@ioc:Adonis/Core/Validator'
import Qtx from 'App/Models/Qtx';
export default class QsersController {
    public async index({ view }: HttpContextContract) {
        const qtx = await Qtx.all()
        return view.render('que', {
            txdata: qtx
        })
    }
    public async store({ request, response }: HttpContextContract) {
        const { service } = request.only(['service'])
        // const bval = await schema.create({
        //     service: schema.string()
        // })
        // const payload = await request.validate({ schema: bval })
        let strQ = "select getQueue() as num;";

        const query = await Database.rawQuery(strQ);
        let getnum = query[0][0].num

        let inStrQ = `insert into transection(trandate,trantrime,number,status,counter,service) values(now(),now(),${getnum},'1','0','${service}');`
        await Database.rawQuery(inStrQ);
        response.header('content-type', 'application/json')
        Ws.io.emit('TakeQue', {
            type: "QUEUE",
            qnumber: getnum,
        })
        return { number: getnum };
    }

    public async inCall({ request }: HttpContextContract) {

        const qtx = await Qtx.all()

        return qtx;
    }

    public async printTick() {

        let printer = new ThermalPrinter({
            type: PrinterTypes.STAR,                                  // Printer type: 'star' or 'epson'
            interface: 'tcp://XXX.XXX.XXX.XXX',                       // Printer interface
            characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
            removeSpecialCharacters: false,                           // Removes special characters - default: false
            lineCharacter: "=",                                       // Set character for lines - default: "-"
            options: {                                                 // Additional options
                timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
            }
        });

        let isConnected = await printer.isPrinterConnected();       // Check if printer is connected, return bool of status
        let execute = await printer.execute();                      // Executes all the commands. Returns success or throws error
        let raw = await printer.raw(Buffer.from("Hello world"));    // Print instantly. Returns success or throws error
        printer.print("Hello World");                               // Append text
        printer.println("Hello World");                             // Append text with new line
        printer.openCashDrawer();                                   // Kick the cash drawer
        printer.cut();                                              // Cuts the paper (if printer only supports one mode use this)
        printer.partialCut();                                       // Cuts the paper leaving a small bridge in middle (if printer supports multiple cut modes)
        printer.beep();                                             // Sound internal beeper/buzzer (if available)
        printer.upsideDown(true);                                   // Content is printed upside down (rotated 180 degrees)
        printer.setCharacterSet("SLOVENIA");                        // Set character set - default set on init
        printer.setPrinterDriver(Object)                            // Set printer drive - default set on init

        printer.bold(true);                                         // Set text bold
        printer.invert(true);                                       // Background/text color inversion
        printer.underline(true);                                    // Underline text (1 dot thickness)
        printer.underlineThick(true);                               // Underline text with thick line (2 dot thickness)
        printer.drawLine();                                         // Draws a line
        printer.newLine();                                          // Insers break line

        printer.alignCenter();                                      // Align text to center
        printer.alignLeft();                                        // Align text to left
        printer.alignRight();                                       // Align text to right

        printer.setTypeFontA();                                     // Set font type to A (default)
        printer.setTypeFontB();                                     // Set font type to B

        printer.setTextNormal();                                    // Set text to normal
        printer.setTextDoubleHeight();                              // Set text to double height
        printer.setTextDoubleWidth();                               // Set text to double width
        printer.setTextQuadArea();                                  // Set text to quad area
        printer.setTextSize(7, 7);                                   // Set text height (0-7) and width (0-7)

        printer.leftRight("Left", "Right");                         // Prints text left and right
        printer.table(["One", "Two", "Three"]);                     // Prints table equaly
        printer.tableCustom([                                       // Prints table with custom settings (text, align, width, cols, bold)
            { text: "Left", align: "LEFT", width: 0.5 },
            { text: "Center", align: "CENTER", width: 0.25, bold: true },
            { text: "Right", align: "RIGHT", cols: 8 }
        ]);

        printer.code128("Code128");                                 // Print code128 bar code
        printer.printQR("QR CODE");                                 // Print QR code
        await printer.printImage('./assets/olaii-logo-black.png');  // Print PNG image
    }

    public async adsv({ view }) {
        return view.render('ads')
    }

    public async tellerCall({ request,response }) {
        const { service, number, counter, txid } = request.only(['service', 'number', 'counter', 'txid'])
        const rsdata = {};
        let status = 0;
        let recall = 0;
        let branch = "001"
        if (number === "" && txid === "CALL") {
            //qry = 'select * from  transection where status = 1 and trandate = DATE_FORMAT(now(),"%Y-%m-%d") order by number LIMIT 1;'
            const dt = await Qtx.query().select('id','number','counter').where('status', 1).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d")').orderBy('number').first()
            if(dt){
                Object.assign(rsdata,dt.$original);
                status = 2;
            }   
        }
        if(number === "" && txid === "RECALL"){
            const dt = await Qtx.query().select('id').where('status', 2).where('counter',counter).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d")').orderBy('number','desc').first()
            if(dt){
                Object.assign(rsdata,dt.$original);
                status = 2;
                recall = 1;
            }
        }
        // if (number !== "" && txid === "CALL") {
        //     const dt = await Qtx.query().where('status', 1).where('qnumber', number).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d")').orderBy('number').first()
        //     Object.assign(rsdata, dt.$original)
        //     status = 2;
        // }
        if(number !== "" && txid === "REJ"){
            const dt = await Qtx.query().where("number",number).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d")').update({
                status:3,
                counter:counter
            })
            Object.assign(rsdata, dt);
        }
        try {
            const txn = await Qtx.find(rsdata.id)
            txn.status = status;
            txn.counter = counter;
            txn.recall = recall;
            await txn.save()

            if(txn){
                Ws.io.emit('TakeCall'+branch, {
                    type: txid,
                    qnumber: rsdata.qnumber,
                    counter: counter
                })
            }
            
            return {
                error:false,
                message: 200,
                data:txn
            };
        } catch (e) {  
            return {
                error:true,
                message:e.status
            }
        }
    }

    public async getGeneral({response}){

        response.status(200)
        return {
            total_ticket:100,
            waiting:20,
            total_served:20,
            mcall:10,
            reject:1,
            mfast:"00:01:32",
            mslow:"00:01:32",
            mlatest:"00:01:32",
        }
    }

    public async getFLowNumber(){

        const dt = await Qtx.query().count("*","amt").where('status',1).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d")')
        const dtNum = await Qtx.query().where("status",1).whereRaw('trandate=DATE_FORMAT(now(),"%Y-%m-%d") and number = (select min(number) from `transection` where `status` = 1 and trandate=DATE_FORMAT(now(),"%Y-%m-%d"))').first()
        console.log(dt)
        const dtser = await Qservice.query().where("qcode", dtNum?.service || "").first()
        
        return {
            error: false,
            message:"",
            data:{
                waiting:dt[0].$extras.amt,
                currnum:dtNum?.qnumber || 0,
                service:dtser?.title || "No queue",
            }
        }
    }

    public async getServiceWaiting({response}){
        const dt = await Qservice.all()

        response.status(200)
        return {
            error:false,
            message:"",
            data: dt
        }
    }
}
