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
      `INSERT INTO students (name, image, "stockTotal", "pricePerDay")
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
    res.sendStatus(500)
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
      firstSemesterGrade = $3, lastSemesterGrade = $4, 
      teachersName = $5, roomNumber = $6 WHERE id = $7;`,
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
    res.sendStatus(500)
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
