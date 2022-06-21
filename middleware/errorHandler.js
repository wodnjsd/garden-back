// ? Error handling functionality will go in here.

export default function errorHandler(err, req, res, next) {

  // ! More complex error handling for validation errors.
  if (err.name === 'ValidationError') {
    // ! A little bit of javascript to extract the useful info from our mongoose error.
    const customErrors = {}
    
    console.log(err.errors)

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    console.log(customErrors)

    return res.status(422).json({ 
      message: 'User has missing or invalid fields.',
      errors: customErrors,
    })
  }


  res.status(500).json({ message: "There was an error" })
  next()

}