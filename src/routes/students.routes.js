import express from 'express'
import { studentsSchema } from '../schemas/students.schema'
import {
  validateDeleteStudent,
  validateStudent,
  validateUpdateStudent
} from '../middlewares/students.middlewares'
import {
  createStudents,
  deleteStudents,
  getStudents,
  updateStudents
} from '../controllers/students.controller'
import { validateSchema } from '../schemas/validateSchema.middleware'

const router = express.Router()

router.get('/students', getStudents)
router.post(
  '/students',
  validateSchema(studentsSchema),
  validateStudent,
  createStudents
)
router.update(
  '/students/:id',
  validateSchema(studentsSchema),
  validateUpdateStudent,
  updateStudents
)
router.delete('/students/:id', validateDeleteStudent, deleteStudents)

export default router
