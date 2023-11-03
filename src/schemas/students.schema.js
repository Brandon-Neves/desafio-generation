import joi from 'joi'

export const studentsSchema = joi.object({
  name: joi.string().min(3).required(),
  age: joi.number().required(),
  firstSemesterGrade: joi.number().required(),
  lastSemesterGrade: joi.number().required(),
  teachersName: joi.string().min(3).required(),
  roomNumber: joi.number().required()
})
