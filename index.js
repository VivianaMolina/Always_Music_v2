const { Pool } = require("pg");

const argumentos = process.argv.slice(2);
const evento = String(argumentos[0]);
const nombre = String(argumentos[1]);
const rut = String(argumentos[2]);
const curso = String(argumentos[3]);
const nivel = String(argumentos[4]);

const config = {
    host: "localhost",
    port: 5432,
    database: "alwaysmusic",
    user: "postgres",
    password: "1234",
};
const pool = new Pool(config);


// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const insertstudents = async (nombre, rut, curso, nivel) => {
    try {
        //Hacer todas las consultas con un JSON como argumento del método query
        const insert = {
            text: 'INSERT INTO students (nombre, rut, curso, nivel) values ($1, $2, $3, $4)',
            values: [nombre, rut, curso, nivel],
        };

        const response = await pool.query(insert);
       
        console.log(`Estudiante ${nombre} agregado con éxito`, response);

    } catch (error) {
        // 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const { code } = error;
        console.log("Se ha producido un error al insertar el registro : Código del error = ", code, " - ", error.message);
     //   throw error;
    } finally {
        pool.end();
    }
};

//  Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const getStudentRecordbyRut = async (rut) => {
    try {
        //Hacer todas las consultas con un JSON como argumento del método query
        const consulta = {
            text: 'SELECT * FROM students where rut = $1',
            values: [rut],
        };        

        const registro = await pool.query(consulta);

        // Muestra el registro por consola
        //4. Obtener el registro de los estudiantes registrados en formato de arreglos.
        console.log('El estudiante seleccionado por rut es:', registro.rows);
    } catch (error) {
        // 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const { code } = error;
        console.log("Se ha producido un error al obtener el registro por rut : Código del error = ", code, " - ", error.message);
      //  throw error;
    } finally {
        pool.end();
    }
}

//  Crear una función asíncrona para obtener por consola todos los estudiantes registrados
const getRegisteredStudents = async () => {
    try {
        //Hacer todas las consultas con un JSON como argumento del método query
        const consulta = {
            text: "SELECT * FROM students"
        };  
        const registro = await pool.query(consulta);

        // Muestra el registro por consola
        //4. Obtener el registro de los estudiantes registrados en formato de arreglos. (registro.rows)
        console.log('registro actual', registro.rows);
    } catch (error) {
        // 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const { code } = error;
        console.log("Se ha producido un error al consultar los registros : Código del error = ", code, " - ", error.message);
      //  throw error;
    } finally {
        pool.end();
    }
}

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const updateStudent = async (nombre, rut, curso, nivel) => {
    try {
        //Hacer todas las consultas con un JSON como argumento del método query
        const update = {
            text: "UPDATE students SET nombre = $1, rut = $2, curso = $3, nivel = $4 where rut = $2",
            values: [nombre, rut, curso, nivel],
        };        

        const registro = await pool.query(update);

        // Muestra el registro por consola
        console.log(`Estudiante ${nombre} editado con éxito`, registro);
    } catch (error) {
        // 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const { code } = error;
        console.log("Se ha producido un error al actualizar el registro : Código del error = ", code, " - ", error.message);
     //   throw error;
    } finally {
        pool.end();
    }
}

// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteStudent = async (rut) => {
    try {
        //Hacer todas las consultas con un JSON como argumento del método query
        const deleteStudent = {
            text: 'DELETE FROM students where rut = $1',
            values: [rut],
        };  
        const registro = await pool.query(deleteStudent);

        // Muestra el registro por consola
        console.log(`Registro de estudiante con rut ${rut} eliminado`, registro);
    } catch (error) {
       // 3. Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const { code } = error;
        console.log("Se ha producido un error al eliminar el registro : Código del error = ", code, " - ", error.message);
     //   throw error;
    } finally {
        pool.end();
    }
}

//2. Hacer las consultas con texto parametrizado. 
switch (evento) {
    case "nuevo":
        insertstudents(nombre, rut, curso, nivel);
        break;
    case "consulta":
        getRegisteredStudents();
        break;
    case "editar":
        updateStudent(nombre, rut, curso, nivel);
        break;
    case "rut":
        getStudentRecordbyRut(rut);
        break;
    case "eliminar":
        deleteStudent(rut);
        break;
    default:
        console.log("ingrese parametros validos");
}