/* This is a JavaScript code for building a Functional Elevator */
// Code made by @Guillermo Rivas ! :D

//We can start building a class for the elevator

/* 
    Starting the class, you need to pass how many floors
    the building are going to have, then the class do all
    the logic, you can pass two initial parameters and this params
    are going to be the "floorStart" where do the floor of
    the building start and then the floorEnding where the
    building end's, and if you want to elevator stay in a
    specific floor, then you can pass a param with the floorStatic
    and that it's going to be the floor where sits the elevator when no one
    call it, if you don't pass any param this is going to sit at the floor
    "0", with all explain it, then pass it into the class instance, 
    then the calls is going to calculate the
    funcionality of each elevator.
*/

class Elevator {
    constructor(floorsStart, floorsEnding, floorStatic=0) {
        //This is going to be the static floor when the elevator sits
        //when no one is calling it for all the instances of Elevator
        this.floorStatic = floorStatic;

        //We do another property for the actualHandlingFloor of each elevator
        this.actualFloor = this.floorStatic;
        
        //This is a existing array of floor's in the building
        //we start with the empty array
        this.floorsBuilding = [];
        for (let i = floorsStart; i <= floorsEnding; i++) {
            //We are going to add each floor to the array, in order
            this.floorsBuilding.push(i);
        }

        //I'm going to add a property, when the elevator is working or not
        this.working = false;

        //I'm adding too a boolean if the elevator is working or not,
        // is it set it to true for default
        this.isWorkingElevator = true;
        
        //I'm going adding other boolean of maxKG if the elevator exceeds it
        this.isMaxKG = false;
    } 

    
    
    //I'm creating the functionality of each elevator instanciating
    //First the UP funcionality, depending on the floor, that are requesting
    //the elevator
    up(requestedFloor) {
        //We first check if the UP functionality, can handle the requestedFloor,
        //what i mean, if there is a floor, that you can only go there just going down
        if (requestedFloor > this.actualFloor) {
            //If there is no maxKG we can go up
            if (!this.isMaxKG) {
                //Check if the requested floor isn't the final floor, because you can only go down in that situation
                if (requestedFloor <= this.floorsBuilding[this.floorsBuilding.length - 1] 
                    && this.actualFloor !== requestedFloor) {
                    //If the THIS elevator have that requestedFloor and is not working at that time,
                    //he can go up to that floor
                    if (this.floorsBuilding.indexOf(requestedFloor) > -1 && !this.working) {
                        //Each time this method is requested or called, we clear the interval for the
                        //inactivity
                        clearTimeout(this.inactivity);

                        //Elevator going Up!
                        //You can put any functionality right here
                        this.working = true;
                        console.log(`Elevator going to this floor: ${requestedFloor}`); //I'm just doing a console.log();

                        //I'm going to set a timeOut, to 10secs, then the this.working is set it
                        // to false again, and we open the doors of the elevator
                        setTimeout(() => {
                            //First we open the doors and set again this.working to false again and we set
                            //the static floor to the requestedFloor
                            openDoors();
                            console.log("Arriving to the floor !"); //@REMOVE
                            this.actualFloor = requestedFloor;
                            this.working = false;
                        }, 1000 * 4);


                        //If there is no activity, then we do a inactivity(),
                        //if there is pushed again a up button, we clear this timeOut
                        this.inactivity(requestedFloor);
                    }
                }else {
                    console.log("You can only go down or you are already on this floor !");
                }
            }else {
                console.log("The elevator cannot affort this KG");
            }
        }else {
            console.log("You can only go down in that situation !");
        }
    }


    //Second the DOWN funcionality, depending on the floor, that are requesting
    //the elevator
    down(requestedFloor) {
        // We first check if the DOWN functionality can handle that floor
        console.log(requestedFloor, this.actualFloor);
        if (requestedFloor < this.actualFloor) {
            //If there is no maxKG we can go down
            if (!this.isMaxKG) {
                //Check if the requested floor isn't the first floor, because you can only go up in that situation
                if (requestedFloor >= this.floorsBuilding[0] && this.actualFloor !== requestedFloor) {
                    //If the THIS elevator have that requestedFloor and is not working at that time,
                    //he can go down to that floor
                    if (this.floorsBuilding.indexOf(requestedFloor) > -1 && !this.working) {
                        //Each time this method is requested or called, we clear the interval for the
                        //inactivity
                        clearTimeout(this.inactivity);

                        //Elevator going Up!
                        //You can put any functionality right here
                        this.working = true;
                        console.log(`Elevator going to this floor: ${requestedFloor}`); //I'm just doing a console.log();

                        //I'm going to set a timeOut, to 10secs, then the this.working is set it
                        // to false again, and we open the doors of the elevator
                        setTimeout(() => {
                            //First we open the doors and set again this.working to false again and we set
                            //the static floor to the requestedFloor
                            openDoors();
                            this.actualFloor = requestedFloor;
                            this.working = false;
                        }, 1000 * 4);


                        //If there is no activity, then we do a inactivity(),
                        //if there is pushed again a up button, we clear this timeOut
                        this.inactivity(requestedFloor);
                    }
                }else {
                    console.log("You can only go up or you are already on this floor !");
                }
            }else {
                console.log("The elevator cannot affort this KG");
            }
        }else {
            console.log("You can only go up in that situation !");
        }
    }

    //Functionality for openingTheDoors
    openDoors() {
        console.log("Opening Doors.");
    }

    //Funcionality for closingTheDoors 
    closeDoors() {
        console.log("Closing Doors.");
    }

    //Functionality for the buttons inside the elevator
    pushButton(floor) {
        //We check first if the floor we are requesting inside the elevator, isnt the actual floor
        if (floor !== this.actualFloor) {
            //We check if the floor is inside of the floors building
            if (this.floorsBuilding.indexOf(floor) > -1) {
                //Now we handle what the elevator are going to do
                //if he needs to go UP or DOWN
                if (floor > this.actualFloor) {
                    up(floor);
                }else if (floor < this.actualFloor){
                    down(floor);
                }
            }
        }
    }

    //Inactivity function
    inactivity(requestedFloor) {
        setTimeout(() => {
            //We close the doors, then send the elevator to the floorStatic
            closeDoors();
            
            //We check if the elevator need to go down or up
            if (this.floorStatic < requestedFloor) {
                //We call down, to the elevator go down
                this.down(this.floorStatic);
            }else if (this.floorStatic > requestedFloor){
                this.up(this.floorStatic);
            }else {
                console.log("Already in the 0 floor !");
            }
        }, 1000 * 10);
    };
    
}

const prom = Promise.resolve([10, 20, 30]);
let arrayOfNums;

prom
    .then(nums => nums.map(num => num * 10))
    .then(nums => console.log(nums));
//------------------------------ TESTING --------------------------//
