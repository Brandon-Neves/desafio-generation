import { db } from '../database/database.js'

export async function getStudents(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM students;')
    res.status(200).send(rows)
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function createStudents(req, res) {
  const {
    name,
    age,
    firstSemesterGrade,
    lastSemesterGrade,
    teachersName,
    roomNumber
  } = res.locals.students

  try {
    await db.query(
      `INSERT INTO students (name, age, first_semester_grade, last_semester_grade, teachers_name, room_number)
    VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        name,
        age,
        firstSemesterGrade,
        lastSemesterGrade,
        teachersName,
        roomNumber
      ]
    )
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(console.log(err))
  }
}

export async function updateStudents(req, res) {
  const {
    name,
    age,
    firstSemesterGrade,
    lastSemesterGrade,
    teachersName,
    roomNumber
  } = res.locals.students
  const idStudent = req.params.id

  try {
    await db.query(
      `UPDATE students SET name = $1, age = $2, 
      first_semester_grade = $3, last_semester_grade = $4, 
      teachers_name = $5, room_number = $6 WHERE id = $7;`,
      [
        name,
        age,
        firstSemesterGrade,
        lastSemesterGrade,
        teachersName,
        roomNumber,
        idStudent
      ]
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(console.log(err))
  }
}

export async function deleteStudents(req, res) {
  const idStudent = req.params.id
  try {
    await db.query(
      `
    DELETE FROM students WHERE id = $1`,
      [idStudent]
    )
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
}
