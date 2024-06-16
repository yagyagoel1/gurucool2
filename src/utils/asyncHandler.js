  
const asyncHandler = (fn)=>async (req,res,next)=>{
      try {
          await fn(req,res,next)
      }
      catch (error){
          res.status(error.code||500).json({
              success:false,
              message : "internal server error"
          })
          //store the user info 
          console.log("error",error)
      }
  }
  export { asyncHandler };