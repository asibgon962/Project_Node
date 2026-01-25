const express= require("express");
const router=express.Router();
const persona_Controller=require('../controllers/controllers.cjs');
const middlewares=require("./middlewares.cjs")
const {subidas_imagenes}=require("../files/Usuarios_imagen.cjs")
const {subidas_actividades}=require("../files/Actividades_entregadas_archivo.cjs")



//-----endpoints que hacen uso del middleware de multer
router.post("/register",[subidas_imagenes.single("foto")], persona_Controller.create) //Ruta que nos permite crear el usuario en la db
router.post("/inicio/upload_activity",middlewares.verificarToken, [subidas_actividades.single("archivo")], persona_Controller.upload_activity) //ruta que permite a un usuario crerar una actividad



//-----endpoints que no hacen uso del middleware de multer y sólo de verificar token
router.get("/", persona_Controller.root)  //Ruta que nos permite obtener el token de inicio de sesión y obtener el html de portada
router.post("/inicio", persona_Controller.start_session)  //Ruta que nos permite obtener el token de inicio de sesión y obtener el html de portada
router.get("/inicio/get_all_photo",middlewares.verificarToken, persona_Controller.get_all_photo)
router.put("/inicio/edit_last_conexion",middlewares.verificarToken, persona_Controller.edit_last_conexion)
router.post("/inicio/set_all_minutes",middlewares.verificarToken, persona_Controller.calculate_minutes_connected)
router.get("/inicio/get_all_minutes",middlewares.verificarToken, persona_Controller.get_minutes_connected)

router.get("/inicio/get_all_activities",middlewares.verificarToken, persona_Controller.get_all_activities)
router.get("/inicio/get_all_messages",middlewares.verificarToken, persona_Controller.get_all_messages)
router.get("/inicio/get_all_activities_user",middlewares.verificarToken, persona_Controller.get_all_activities_user)
router.post("/inicio/upload_message",middlewares.verificarToken, persona_Controller.upload_message)
router.post("/inicio/upload_answer",middlewares.verificarToken, persona_Controller.upload_answer)
router.delete("/inicio/delete_activity_and_File",middlewares.verificarToken, persona_Controller.delete_activity_and_File) //Ruta que nos permite borrar usuarios.
router.post("/inicio/add_activities", persona_Controller.insertarDocumentos)
router.post("/inicio/logout",middlewares.verificarToken, persona_Controller.logout)
router.get("/downloadFile",middlewares.verificarToken, persona_Controller.downloadFile)
router.get("/inicio.html",middlewares.verificarToken, persona_Controller.get_inicio_html)
router.post("/create_activities_admin",middlewares.verificarToken, persona_Controller.create_activities_admin)





//-------------MUY IMPORTANTE AQUÍ EXORTAMOS EL ROUTER
module.exports ={router} //¡Devuelvo mis rutas¡¡¡¡