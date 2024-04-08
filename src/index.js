import Alumno from"./models/alumno.js" 
import {sumar,restar,multiplicar,dividir} from"./modules/matematica.js" 
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"

import express from "express";     
import cors from "cors"; 

const app = express(); 
const port = 3000; 

app.use(cors());     
app.use(express.json());

app.get('/',(req,res)=>{  
    res.send('Ya estoy respondiendo!');
}) 
    
app.get('/saludar',(req,res)=>{ 
        res.send('Hello World!'); 
}) 
    
app.listen(port,()=>{ 
        console.log(`Example app listening on port${port}`) 
})

app.get('/saludar/:nombre', (req,res)=>{ 
    let nombre = req.params.nombre;
    let resultado= `Hello ${nombre}`;
    res.status(200).send(resultado);
}) 

app.get('/validarfecha/:ano/:mes/:dia', (req,res)=>{ 
    let ano = req.params.ano;
    let mes = req.params.mes;
    let dia = req.params.dia;
    
    let resultado= `${ano}-${mes}-${dia}`;
    let fecha = Date.parse(resultado)
    
    try{
        if(!isNaN(fecha))
        {
            res.status(200).send(resultado);
        } else { res.status(400).send("error en la fecha ingresada"); }
    }
    catch{
        console.error("ERROR al hacer la request: ", error)
        res.status(400);
    }
}) 

app.get('/matematica/sumar', (req,res)=>{
    let n1= parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = sumar(n1, n2)
    res.status(200).send(respuesta.toString());
})

app.get('/matematica/restar', (req,res)=>{
    let n1= parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = restar(n1, n2)
    res.status(200).send(respuesta.toString());
})

app.get('/matematica/multiplicar', (req,res)=>{
    let n1= parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = multiplicar(n1, n2)
    res.status(200).send(respuesta.toString());
})

app.get('/matematica/dividir', (req,res)=>{
    let n1= parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let respuesta = dividir(n1, n2)
    res.status(200).send(respuesta.toString());
})

app.get('/omdb-wrapper/OMDBSearchByPage',async (req,res)=>{
    let page = req.query.p;
    let text = req.query.s;
    let returnResult= [];
    let returnStatus = 400;

    try{
        returnResult= await OMDBSearchByPage(text, page);
        returnStatus= 200;
    } catch
    {console.error("ERROR al hacer la request: ", error)}

    //console.log(respuesta)
    res.status(200).send(returnResult);
})

app.get('/omdb-wrapper/OMDBSearchComplete',async (req,res)=>{
    let text = req.query.s;
    let returnResult= [];
    let returnStatus = 400;

    try{
        returnResult= await OMDBSearchComplete(text);
        returnStatus= 200;
    } catch
    {console.error("ERROR al hacer la request: ", error)}

    //console.log(respuesta)
    res.status(200).send(returnResult);
})

app.get('/omdb-wrapper/OMDBGetByImdbID',async (req,res)=>{
    let imdbID = req.query.i;
    
    let returnResult= [];
    let returnStatus = 400;

    try{
        returnResult= await OMDBGetByImdbID(imdbID);
        returnStatus= 200;
    } catch
    {console.error("ERROR al hacer la request: ", error)}

    //console.log(respuesta)
    res.status(200).send(returnResult);
})