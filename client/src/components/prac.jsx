const buildSandwitch = (ingrediant1) => {
    return (ingrediant2) => {
        return (ingrediant3) => {
            console.log(`${ingrediant1}_${ingrediant2}_${ingrediant3}`)
        }
    }
}

const fn = () => {}

const curry = (fn) => {
   return curried =  (...args) => {
    if(fn.length !== args.length){
        return curried.bind(null , ...args);
    }
    return fn(...args);
   }
}