import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    verificationTokenExpires: {
        type: Date,
        default: null
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    preferences: {
        language: {
            type: String,
            enum: ['en', 'pt-pt', 'de'],
            default: 'en'
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        }
    }
    
}, {timestamps: true});

// Hash the password before saving the user model
userSchema.pre( 'save', function(next) {
    if (!this.isModified('password')) return next();
    
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
} );

// Method to exclude the password field when converting to JSON
// To avoid exposing the user password
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', userSchema);

export default User;