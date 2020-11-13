import * as Yup from "yup"

export const CreateAccountSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().required("Requerido"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    file: Yup.mixed().test({
        name: "fileSize", 
        message: "Su imagen es demasiado grande 5MB o menos", test: value => {
        if(!value.length) return true
        else return value && value.size <= 500000
        }
    }),
});

export const ValidateEmailSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Requerido"),
})

export const PaymentInformationSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .length(19, "Los números de tarjeta solo son 16")
        .required("Requerido"),
    cardHolder: Yup.string().required("Requerido"),
    expirationDate: Yup.date().required("Requerido"),
    cvv: Yup.string()
        .length(3, "El CVV debe contener solo 3 dígitos")
        .required("Requerido"),
});

export const PersonalIdentificationSchema = Yup.object().shape({
    typeOfDocument: Yup.string().required("Requerido"),
    documentCode: Yup.string()
        .required("Requerido")
        .max(11, "Máximo de 11 caracteres"),
    dateOfBirth: Yup.string().required("Requerido"),
    birthPlace: Yup.string()
        .required("Requerido")
        .max(50, "Máximo de 50 caracteres"),
    telephoneNumber: Yup.string().required("Requerido"),
    nationality: Yup.string()
        .required("Requerido")
        .max(40, "Máximo de 40 caracteres"),
});

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().required("Requerido"),
});

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Requerido"),
    code: Yup.string().required("Requerido"),
});

export const CreatePasswordSchema = Yup.object().shape({
    password: Yup.string().required("Requerido"),
    confirmPassword: Yup.string().required("Requerido"),
});

export const EditProfileSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    telephoneNumber: Yup.string().required("Requerido").length(10),
    placeOfBirth: Yup.string().required("Requerido"),
    nationality: Yup.string().required("Requerido"),
    documentNumber: Yup.string()
        .required("Requerido")
        .max(11, "Máximo de 11 caracteres"),
    profilePicture: Yup.string()
    .required("Requerido"),
    file: Yup.mixed()
});

export const CreateParkingSchema = Yup.object().shape({
    countParking: Yup.number("Introduzca un número").positive("Costo debe ser mayor que 0").required("Requerido"),
    latitude: Yup.string().required("Requerido"),
    longitude: Yup.string().required("Requerido"),
    parkingName: Yup.string().required("Requerido"),
    priceHours: Yup.number("Introduzca un número").positive("Costo debe ser mayor que 0").required("Requerido"),
    pictures: Yup.array().of(Yup.string()),
    mainPicture:  Yup.string().required("Requerido"),
    sector: Yup.string().required("Requerido"),
    direction: Yup.string().required("Requerido"),
    information: Yup.string().required("Requerido"),
    features: Yup.array().of(Yup.string())
});

export const CreateVehicleSchema = Yup.object().shape({    
    licensePlate: Yup.string().max(7, "Máximo 7 caracterés como placa").required("Requerido"),
    detail: Yup.string().required("Requerido"),
    alias:  Yup.string().required("Requerido"),
    bodyStyle:  Yup.string().required("Requerido"),
    year:  Yup.string().required("Requerido"),
    colorExterior:  Yup.string().required("Requerido"),
    model:  Yup.string().required("Requerido"),
    mainPicture:  Yup.string().required("Requerido"),
    pictures: Yup.array().of(Yup.string())
})