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
    code: Yup.string().required("Requerido"),
})

export const PaymentInformationSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .length(16, "Los números de tarjeta solo son 16")
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
    email: Yup.string().email("Email inválido").required("Requerido"),
    dateOfBirth: Yup.string().required("Requerido"),
    file: Yup.mixed().test("fileSize", "Su imagen es demasiado grande 5MB o menos", value => value && value.size <= 500000),
});

export const CreateParkingSchema = Yup.object().shape({
    owner: Yup.string().required("Requerido"),
    address: Yup.string().required("Requerido"),
    sector: Yup.string().required("Requerido"),
    costPerHour: Yup.number("Introduzca un número").positive("Costo debe ser mayor que 0").required("Requerido"),
    file: Yup.mixed().test("fileSize", "Su imagen es demasiado grande 5MB o menos", value => value && value.size <= 500000),
});

export const CreateVehicleSchema = Yup.object().shape({
    model: Yup.string().required("Requerido"),
    year: Yup.string().required("Requerido"),
    licenseplate: Yup.string().max(7, "Máximo 7 caracterés como placa").required("Requerido"),
    type_vehicle: Yup.string().required("Requerido"),
    detail: Yup.string(),
    color_exterior: Yup.string(),
    alias: Yup.string()
})