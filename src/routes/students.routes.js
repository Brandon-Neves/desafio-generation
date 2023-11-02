import { Router } from 'express'
import { studentsSchema } from '../schemas/students.schema.js'
import {
  validateDeleteStudent,
  validateStudent,
  validateUpdateStudent
} from '../middlewares/students.middlewares.js'
import {
  createStudents,
  deleteStudents,
  getStudents,
  updateStudents
} from '../controllers/students.controller.js'
import { validateSchema } from '../schemas/validateSchema.middleware.js'

const router = Router()

router.get('/students', getStudents)
router.post(
  '/students',
  validateSchema(studentsSchema),
  validateStudent,
  createStudents
)
router.put(
  '/students/:id',
  validateSchema(studentsSchema),
  validateUpdateStudent,
  updateStudents
)
router.delete('/students/:id', validateDeleteStudent, deleteStudents)

export default router
