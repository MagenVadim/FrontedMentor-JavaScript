let buttonNextStep = document.querySelector(".button-next-step");
let switcherButtonNS = document.querySelector(".next-step");

let span = document.querySelectorAll("span");

let buttonGoBack = document.querySelector(".button-go-back");
let buttonGoBackHidden = document.querySelector(".button-go-back.hidden");
let buttonConfirmHidden = document.querySelector(".button-confirm-step");
let clickConfirmButton = document.querySelector(".confirm-step");

let stepOne = document.querySelector(".stepOne");
let stepTwo = document.querySelector(".stepTwo.hidden");
let stepThree = document.querySelector(".stepThree.hidden");
let stepFour = document.querySelector(".stepFour");
let spanActive = document.querySelector(".active");

let toggleSwitch = document.querySelector(".switcher"); // "input" of checkbox "Montly/Yearly"
let periodChecked = document.querySelector(".period.checked"); // "p" of checkbox "Montly/Yearly" in status "Montly"
let periodUnchecked = document.querySelector(".period.unchecked"); //"p" of checkbox "Montly/Yearly" in status "Yearly"
let monthPlan = document.querySelector(".type-of-plan-monthly");
let yearPlan = document.querySelector(".type-of-plan-yearly");

let type_of_plan_monthly = document.querySelector(".type-of-plan-monthly");
let type_of_plan_yearly = document.querySelector(".type-of-plan-yearly");
let all_type_of_plan_monthly = document.querySelectorAll(".plan");
let all_type_of_plan_yearly = document.querySelectorAll(".type-of-plan-yearly .plan");

let add_service = document.querySelector(".services");

// переменные для состояния "checkbox" Дополнительных скрвисов.
let checkbox_online_service = document.querySelector("#online_service");
let checkbox_larger_storage = document.querySelector("#larger_storage");
let checkbox_customizable_profile = document.querySelector("#customizable_profile");

let finish_online_service_plane_HTML = document.querySelector("#online_service_plane");
let finish_online_service_price_HTML = document.querySelector("#online_service_price");
let class_finish_online_service = document.querySelector(".add_finish_tarif.online"); // selector to hide the Online Additional Services  field on the Final Page.

let finish_larger_storage_plane_HTML = document.querySelector("#larger_storage_plane");
let finish_larger_storage_price_HTML = document.querySelector("#larger_storage_price");
let class_finish_larger_storage = document.querySelector(".add_finish_tarif.storage"); // selector to hide the Storage Additional Services  field on the Final Page.

let finish_customizable_profile_plane_HTML = document.querySelector("#customizable_profile_plane");
let finish_customizable_profile_price_HTML = document.querySelector("#customizable_profile_price");
let class_finish_customizable_profile = document.querySelector(".add_finish_tarif.customizable"); // selector to hide the Customizable Additional Services field on the Final Page.
let line_border = document.querySelector(".line-border");

let warnSelectPlan = document.querySelector(".warn");
let change_link = document.querySelector(".change");

//**********************************************************************************/
let finish_tarif_plane; let finish_tarif_price; // a variable to save the tariff plan and the tariff to display on the Final Page.
let finish_multiplayer_plane; let finish_multiplayer_price;
let finish_storage_plane; let finish_storage_price;
let finish_customizable_plane; let finish_customizable_price;

let finish_tarif_plane_HTML = document.querySelector(".finish_tarif_plane");
let finish_tarif_price_HTML = document.querySelector(".finish_tarif_price");

let add_price_monthly = document.querySelectorAll(".add-price-monthly");
let add_price_yearly = document.querySelectorAll(".add-price-yearly");
let check_toggle_switch_status = document.querySelector(".add-price-monthly");

let total_price = document.querySelector(".total_price");
let total_basic=0;
let total_summary=0;
check_while=false;


let form = document.querySelector("#form")
let username = document.querySelector("#card-name");
let email = document.querySelector("#email-address");
let phonenumber = document.querySelector("#phone-number");

let checkValidateInputs = false;
let checkRegExp = false;
let checkTarifPlan = true;

let thanking = document.querySelector(".thanking");
// ---------------------------------------------------------------------------------------------------------------

buttonNextStep.addEventListener('click', ()=>{
        // If the "Go Back" button is hidden, then display it.
        validateInputs();  //  call the function to check the InputForm;
        if(checkValidateInputs) stepOne.classList.add("hidden"); 
        if(buttonGoBackHidden.className == "button-go-back hidden" && checkValidateInputs){buttonGoBackHidden.classList.toggle("hidden")}
    
        for (let i=0; i<span.length-1;i++){
            const className = span[i].className;
    
            // determine which Step Number in the cycle is active.
            if(className == "active" && checkValidateInputs){
                // if step is equal to 1, then deactivate the "hidden" style on the "SelectPlan" page   
                if(span[i].textContent == 1){                     
                    stepTwo.classList.toggle("hidden");
                    if(checkTarifPlan){
                        switcherButtonNS.setAttribute('disabled', ''); // make the "NextStep" button inactive;
                    }                    
                }
    
                if(span[i].textContent == 2){
                    //to check all the "className" of the tariff plans, and go to the next stage only if at least one of them is selected.                
                        all_type_of_plan_monthly.forEach(el =>{
                            if(el.className.match(/selected/)){                                                  
                                total_summary=total_basic;                 
                                stepTwo.classList.toggle("hidden");
                                stepThree.classList.toggle("hidden");
                                // check the "switcher" status ("Montly/Yearly") if it is in the "Yearly" status, then when you click the "NextStep" button in the next step, hide the Monthly rates for "additional services" and display the Annual rates.
                                if(periodChecked.className=="period unchecked" && check_toggle_switch_status.className==="add-price-monthly"){
                                    add_price_monthly.forEach(element =>{element.classList.toggle("hidden")});
                                    add_price_yearly.forEach(element =>{element.classList.toggle("hidden")});
                                }
                                //  if the "checkbox" ("Montly/Yearly") is in the "Monthly" status and the prices for Additional Services are on an annualized basis, then we change the price of Additional Services to "Monthly" as well
                                if(periodChecked.className=="period checked" && check_toggle_switch_status.className==="add-price-monthly hidden"){                                
                                    add_price_monthly.forEach(element =>{element.classList.toggle("hidden")});
                                    add_price_yearly.forEach(element =>{element.classList.toggle("hidden")});
                                }
                            }                                              
                        })    
      
                }
                if(span[i].textContent == 3){
                    stepThree.classList.toggle("hidden");
                    stepFour.classList.toggle("hidden");                    
                            
                    if(buttonNextStep.className == "button-next-step"){                        
                        buttonNextStep.classList.toggle("hidden");
                        finish_tarif_plane_HTML.innerHTML = finish_tarif_plane;
                        finish_tarif_price_HTML.innerHTML = finish_tarif_price;                                                                             
                    }
                    buttonConfirmHidden.classList.toggle("hidden"); // expand the display of the "Confirm" button
    
                    // Check the status of the "checkbox" Step 3 (Pick add-ons), if the checkbox is selected, then display the tarif in the final page Step 4
                    // Monthly plan (Additional services on the Final page)
                    if (periodChecked.className==="period checked"){
                        if(checkbox_online_service.checked) {                     
                            finish_online_service_plane_HTML.innerHTML = "Online Service";
                            finish_online_service_price_HTML.innerHTML = "+1$/mo";
    
                            total_summary = total_summary+1;
                            total_price.innerHTML = `+$${total_summary}/mo`; //display on page 4 the basic tarif + additional
                            
                            if(class_finish_online_service.className=="add_finish_tarif online hidden"){
                                class_finish_online_service.classList.toggle("hidden");
                            }
                        };
                        if(checkbox_larger_storage.checked){
                            finish_larger_storage_plane_HTML.innerHTML = "Larger Storage";
                            finish_larger_storage_price_HTML.innerHTML = "+2$/mo";
    
                            total_summary = total_summary+2;
                            total_price.innerHTML = `+$${total_summary}/mo`; //display on page 4 the basic tarif + additional
    
                            if(class_finish_larger_storage.className=="add_finish_tarif storage hidden"){
                                class_finish_larger_storage.classList.toggle("hidden");
                            }
                        } 
                        if(checkbox_customizable_profile.checked){
                            finish_customizable_profile_plane_HTML.innerHTML = "Customizable Profile";
                            finish_customizable_profile_price_HTML.innerHTML = "+2$/mo"; 
                            
                            total_summary = total_summary+2;
                            total_price.innerHTML = `+$${total_summary}/mo`; //display on page 4 the basic tarif + additional
    
                            if(class_finish_customizable_profile.className=="add_finish_tarif customizable hidden"){
                                class_finish_customizable_profile.classList.toggle("hidden");
                            }
                        } 
    
                        // if the "checkbox" is disabled, then hide the tariff in the final page Step 4
                        if(!checkbox_online_service.checked && class_finish_online_service.className=="add_finish_tarif online"){
                            class_finish_online_service.classList.toggle("hidden");
                        }
                        if(!checkbox_larger_storage.checked && class_finish_larger_storage.className=="add_finish_tarif storage"){
                            class_finish_larger_storage.classList.toggle("hidden");
                        }
                        if(!checkbox_customizable_profile.checked && class_finish_customizable_profile.className=="add_finish_tarif customizable"){
                            class_finish_customizable_profile.classList.toggle("hidden"); 
                        }
                    }  
    
                    // YERLY tariff plan (Additional services on the Final page)
                    if (periodChecked.className==="period unchecked"){
                        if(checkbox_online_service.checked) {
                            finish_online_service_plane_HTML.innerHTML = "Online Service";
                            finish_online_service_price_HTML.innerHTML = "+10$/yr";
    
                            total_summary = total_summary+10;
                            total_price.innerHTML = `+$${total_summary}/yr`; //display on page 4 the basic tarif + additional
    
                            if(class_finish_online_service.className=="add_finish_tarif online hidden"){
                                class_finish_online_service.classList.toggle("hidden");
                            }
                        };
                        if(checkbox_larger_storage.checked){
                            finish_larger_storage_plane_HTML.innerHTML = "Larger Storage";
                            finish_larger_storage_price_HTML.innerHTML = "+20$/yr";
    
                            total_summary = total_summary+20;
                            total_price.innerHTML = `+$${total_summary}/yr`; //display on page 4 the basic tarif + additional
    
                            if(class_finish_larger_storage.className=="add_finish_tarif storage hidden"){
                                class_finish_larger_storage.classList.toggle("hidden");
                            }
                        } 
                        if(checkbox_customizable_profile.checked){
                            finish_customizable_profile_plane_HTML.innerHTML = "Customizable Profile";
                            finish_customizable_profile_price_HTML.innerHTML = "+20$/yr";
    
                            total_summary = total_summary+20;
                            total_price.innerHTML = `+$${total_summary}/yr`; //display on page 4 the basic tarif + additional
    
                            if(class_finish_customizable_profile.className=="add_finish_tarif customizable hidden"){
                                class_finish_customizable_profile.classList.toggle("hidden");
                            }
                        } 
                        // if "checkbox" is off, then hide the rate in the final page Step 4
                        if(!checkbox_online_service.checked && class_finish_online_service.className=="add_finish_tarif online"){
                            class_finish_online_service.classList.toggle("hidden")
                        }
                        if(!checkbox_larger_storage.checked && class_finish_larger_storage.className=="add_finish_tarif storage"){
                            class_finish_larger_storage.classList.toggle("hidden")
                        }
                        if(!checkbox_customizable_profile.checked && class_finish_customizable_profile.className=="add_finish_tarif customizable"){
                            class_finish_customizable_profile.classList.toggle("hidden")
                        }   
                    }            
                }
                // change on the the sidebar - the serial number of the step.
                span[i].classList.toggle("active");
                span[i+1].classList.toggle("active");
    
                break
            }
        }
    
});

buttonGoBack.addEventListener('click', ()=>{
    switcherButtonNS.removeAttribute('disabled', ''); // activate the "NextStep button"
    if(span[0].textContent == 1 ){checkValidateInputs = false;} // always at step 1 return False for checkValidateInputs;    
    if(buttonConfirmHidden.className==="button-confirm-step") buttonConfirmHidden.classList.toggle("hidden");

    for (let i=0; i<span.length;i++){
        const className = span[i].className; 

        total_summary=total_basic;
        total_price.innerHTML = total_summary; // when returning a step back, assign and display on the page "Total price", equivalent to the base one, so that in the absence of additional services (marks in the checkbox), the base rate is displayed.

        if(className == "active"){
            span[i].classList.toggle("active");
            span[i-1].classList.toggle("active");

            if(span[i].textContent == 2 ){
                stepOne.classList.toggle("hidden");
                stepTwo.classList.toggle("hidden");
                if(buttonGoBackHidden.className == "button-go-back"){buttonGoBackHidden.classList.toggle("hidden")}
            }
            if(span[i].textContent == 3){
                stepTwo.classList.toggle("hidden");
                stepThree.classList.toggle("hidden");
            }
            if(span[i].textContent == 4){
                stepThree.classList.toggle("hidden");
                stepFour.classList.toggle("hidden");
                if(buttonNextStep.className == "button-next-step hidden"){buttonNextStep.classList.toggle("hidden")}
            }
            break
        }
    }
});

toggleSwitch.addEventListener('click', ()=>{
    periodChecked.classList.toggle("checked");
    periodChecked.classList.toggle("unchecked");
    periodUnchecked.classList.toggle("unchecked");
    periodUnchecked.classList.toggle("checked");
    monthPlan.classList.toggle("hidden");
    yearPlan.classList.toggle("hidden");

    let selectedPlanTarif; // Variable for storing the name of the tariff plan.
    let defineTypePlan = document.querySelector(".selected");
    console.log(defineTypePlan.id);

    let arcade_plan_monthly = document.querySelector("#arcade-plan-monthly");
    let advanced_plan_monthly = document.querySelector("#advanced-plan-monthly");
    let pro_plan_monthly = document.querySelector("#pro-plan-monthly");
    let arcade_plan_yearly = document.querySelector("#arcade-plan-yearly");
    let advanced_plan_yearly = document.querySelector("#advanced-plan-yearly");
    let pro_plan_yearly = document.querySelector("#pro-plan-yearly");
    // when switching SwicherToggle from monthly to annual (and vice versa), the Tariff plan with the equivalent name is kept highlighted.
    if(defineTypePlan.id==="arcade-plan-monthly"){
        arcade_plan_yearly.classList.toggle("selected"); 
        arcade_plan_monthly.classList.toggle("selected");
        finish_tarif_plane="Arcade (Yearly)";
        finish_tarif_price="$90/yr";
        total_basic=90;
        total_price.innerHTML = `+$${total_basic}/yr`;;
    }

    if(defineTypePlan.id==="advanced-plan-monthly"){
        advanced_plan_yearly.classList.toggle("selected"); 
        advanced_plan_monthly.classList.toggle("selected");
        finish_tarif_plane="Advanced (Yearly)";
        finish_tarif_price="$120/yr";
        total_basic=120;
        total_price.innerHTML = `+$${total_basic}/yr`;
    }

    if(defineTypePlan.id==="pro-plan-monthly"){
        pro_plan_yearly.classList.toggle("selected"); 
        pro_plan_monthly.classList.toggle("selected");
        finish_tarif_plane="Pro (Yearly)";
        finish_tarif_price="$150/yr";
        total_basic=150;
        total_price.innerHTML = `+$${total_basic}/yr`;
    }

    if(defineTypePlan.id==="arcade-plan-yearly"){
        arcade_plan_monthly.classList.toggle("selected"); 
        arcade_plan_yearly.classList.toggle("selected");
        finish_tarif_plane="Arcade (Monthly)";
        finish_tarif_price="$9/mo";
        total_basic=9;
        total_price.innerHTML = `+$${total_basic}/mo`;
    }

    if(defineTypePlan.id==="advanced-plan-yearly"){
        advanced_plan_monthly.classList.toggle("selected");
        advanced_plan_yearly.classList.toggle("selected");
        finish_tarif_plane="Advanced (Monthly)";
        finish_tarif_price="$12/mo";
        total_basic=12;
        total_price.innerHTML = `+$${total_basic}/mo`;
    }

    if(defineTypePlan.id==="pro-plan-yearly"){
        pro_plan_monthly.classList.toggle("selected");
        pro_plan_yearly.classList.toggle("selected");
        finish_tarif_plane="Pro (Monthly)";
        finish_tarif_price="$15/mo";
        total_basic=15;
        total_price.innerHTML = `+$${total_basic}/mo`;
    }
});

// STEP 2 - when you click on the tariff plan (monthly), it is highlighted (frame and background change color)
type_of_plan_monthly.addEventListener('click', event => {
    switcherButtonNS.removeAttribute('disabled', ''); // activate the "NextStep button"
    checkTarifPlan=false; // change the value of the variable to disable blocking the "NextStep button" in step 2.
    if(warnSelectPlan.className==="warn"){
        warnSelectPlan.classList.toggle("hidden"); // hide warning message "You should select a plan before move to the next step."
    }
    

    // iterate over all elements of the array (all tariff plans) and if one of them was selected earlier and selected - remove this selection
    all_type_of_plan_monthly.forEach(element=>{
        if (element.className.match(/selected/)) {
            element.classList.toggle("selected");            
            };        
    })
    // add an additional class "selected" to the ClassList to highlight the selected tariff plan.
    let container = event.target.closest('.plan');
    if(container.id=="arcade-plan-monthly"){
        finish_tarif_plane="Arcade (Monthly)";
        finish_tarif_price="$9/mo";
        total_basic=9;
        total_price.innerHTML = `+$${total_basic}/mo`;
    };
    if(container.id=="advanced-plan-monthly"){
        finish_tarif_plane="Advanced (Monthly)";
        finish_tarif_price="$12/mo";
        total_basic=12;
        total_price.innerHTML = `+$${total_basic}/mo`;
    };
    if(container.id=="pro-plan-monthly"){
        finish_tarif_plane="Pro (Monthly)";
        finish_tarif_price="$15/mo";
        total_basic=15;
        total_price.innerHTML = `+$${total_basic}/mo`;
    };

    container.classList.add('selected');
})

// STEP 2 - after taping on the tariff plan (YERLY), it is highlighted (frame and background change color)

type_of_plan_yearly.addEventListener('click', event => {
    switcherButtonNS.removeAttribute('disabled', ''); // activate the "NextStep" button
    checkTarifPlan=false; // change the value of the variable to disable blocking the NextStep button in step 2.
    if(warnSelectPlan.className=="warn"){
        warnSelectPlan.classList.toggle("hidden"); // hide warning message "You should select a plan before move to the next step."
    }
    // iterate over all elements of the array (all tariff plans) and if one of them was selected earlier and selected - remove this selection
    all_type_of_plan_monthly.forEach(element=>{
        if (element.className.match(/selected/)) {
            element.classList.toggle("selected");
            };
    })
    // add an additional class "selected" to the ClassList to highlight the selected tariff plan.
    let container = event.target.closest('.plan');
    if(container.id=="arcade-plan-yearly"){
        finish_tarif_plane="Arcade (Yearly)";
        finish_tarif_price="$90/yr";
        total_basic=90;
        total_price.innerHTML = `+$${total_basic}/yr`;};
    if(container.id=="advanced-plan-yearly"){
        finish_tarif_plane="Advanced (Yearly)";
        finish_tarif_price="$120/yr";
        total_basic=120;
        total_price.innerHTML = `+$${total_basic}/yr`;
    };
    if(container.id=="pro-plan-yearly"){
        finish_tarif_plane="Pro (Yearly)";
        finish_tarif_price="$150/yr";
        total_basic=150;
        total_price.innerHTML = `+$${total_basic}/yr`;
    };

    container.classList.add('selected');
})

    // add an additional class "add-selected" to the ClassList to highlight the selected tariff plan. Use the "closest" method to prevent all nested elements from bubbling.
add_service.addEventListener('click', event => {    
    let container = event.target.closest('.additional');
    container.classList.toggle('add-selected');
    // when clicking on the entire "additional service" field, if the "flag" on the "checkbox" is missing - add the "flag".
    if(container.className.match(/add-selected/)){        
        if(container.id=='add-multiplayer') checkbox_online_service.checked=1; 
        if(container.id=='add-storage') checkbox_larger_storage.checked=1; 
        if(container.id=='add-customizable') checkbox_customizable_profile.checked=1; 
    }
    // when you click on the already selected "additional service" field, uncheck the "flag" on the "checkbox".
    else if(container.className="additional"){
        if(container.id=='add-multiplayer') checkbox_online_service.checked=0; 
        if(container.id=='add-storage') checkbox_larger_storage.checked=0;
        if(container.id=='add-customizable') checkbox_customizable_profile.checked=0; 
    }
})

change_link.addEventListener('click', ()=>{
    buttonConfirmHidden.classList.toggle("hidden");
    stepTwo.classList.toggle("hidden");
    stepFour.classList.toggle("hidden");
    span[3].classList.toggle("active");
    span[1].classList.toggle("active");
    buttonNextStep.classList.toggle("hidden");
})

// description of the action after clicking on the "Confirm" button
clickConfirmButton.addEventListener('click', () =>{
    stepFour.classList.toggle("hidden");
    buttonGoBack.classList.toggle("hidden");
    buttonConfirmHidden.classList.toggle("hidden");
    thanking.classList.toggle("hidden");
})



// ------------------- VALIDATION OF INPUT FORM  --------------------------------------------------------------------------------------------


const setError = (element, message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error-message");
    errorDisplay.innerHTML = message;    
}

const deleteError = (element) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error-message");
    errorDisplay.innerHTML = "";    
}

const validateInputs = () =>{
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phonenumberValue = phonenumber.value.trim();
    if(usernameValue===""){
        setError(username,'This field is required');                
    }
    else {
        deleteError(username);
    }
    if(emailValue===""){
        setError(email,'This field is required');                
    }
    else {
        if(checkRegExp) deleteError(email);
    }
    if(phonenumberValue===""){
        setError(phonenumber,'This field is required');                
    }
    else {
        deleteError(phonenumber);
    }
    if(usernameValue!="" && emailValue!="" && phonenumberValue!="" && checkRegExp){
        checkValidateInputs=true;
    }

    if(emailValue.match("error"))setError(email, 'error')

}

email.onblur = () =>{
    if(!email.value.includes('@')) {
        setError(email, 'Please, provide correct email');
        checkRegExp=false;
    }
    if(email.value.includes('@')) {
        deleteError(email);
        checkRegExp=true;
    }
}