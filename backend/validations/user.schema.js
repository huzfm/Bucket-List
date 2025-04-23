const { z } = require('zod');
const userSchema = z.object({
      email: z.string().email({ message: "Please enter valid email address" }),
      password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
      confirmPassword: z.string().min(6, { message: 'Please confirm the password' })
})
      .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword']
      })
module.exports = userSchema