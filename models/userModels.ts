import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.mathPassword = async function (enteredPassword: string) {
  const hash = Bun.password.hashSync(enteredPassword, {
    algorithm: 'bcrypt',
    cost: 4,
  })
  return Bun.password.verifySync(this.password, hash)
}

// Hash password with Bun
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  // use bcrypt
  this.password = await Bun.password.hash(this.password, {
    algorithm: 'bcrypt',
    cost: 4, // number between 4-31
  })
})

const User = mongoose.model('User', userSchema)
export default User
