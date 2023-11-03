import { db } from '../database/database.js'

export async function validateStudent(req, res, next) {
  const students = req.body
  const { name } = req.body

  try {
    const nameIsExist = await db.query(
      `SELECT * FROM students WHERE name = $1;`,
      [name]
    )
    if (nameIsExist.rowCount !== 0) {
      return res.sendStatus(409)
    }
    res.locals.students = students
    next()
  } catch (err) {
    res.status(500).send(console.log(err))
  }
}

export async function validateUpdateStudent(req, res, next) {
  const students = req.body
  const id = req.params.id

  try {
    const studentIsExist = await db.query(
      `SELECT * FROM students WHERE id = $1;`,
      [id]
    )
    if (studentIsExist.rowCount === 0) {
      return res.sendStatus(404)
    }
    res.locals.students = students
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}

export async function validateDeleteStudent(req, res, next) {
  const id = req.params.id

  try {
    const studentIsExist = await db.query(
      `SELECT * FROM students WHERE id = $1`,
      [id]
    )

    const { rows } = studentIsExist

    if (studentIsExist.rowCount === 0) {
      return res.sendStatus(404)
    }
    if (rows[0].returnDate === null) {
      return res.sendStatus(400)
    }

    next()
  } catch (err) {
    res.sendStatus(500)
  }
}
