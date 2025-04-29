import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "_id": "",
    "name": "Paracetamol",
    "description": "Analgesic and antipyretic used to relieve mild to moderate pain and reduce fever.",
    "type": "Analgesic",
    "presentation": "Tablets",
    "unit": "mg",
    "dosage": "500mg every 8 hours",
    "composition": ["Paracetamol"],
    "price": 12.5,
    "stock": 50,
    "manufacturer": "Genfar",
    "expirationDate": { "$date": "2026-05-01T00:00:00.000Z" },
    "prescriptionRequired": false,
    "administrationRoute": "Oral",
    "sideEffects": ["Nausea", "Skin rash", "Allergic reactions"],
    "indications": ["Mild to moderate pain", "Fever"],
    "contraindications": ["Severe liver disease"],
    "imageUrl": "../assets/images/butter-chicken-4.jpg",
    "createdAt": { "$date": "2025-04-29T00:00:00.000Z" }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, phone, email, role  } = action.payload;
            state._id = _id;
            state.name = name;
            state.phone = phone;
            state.email = email;
            state.role = role;
            state.isAuth = true;
        },

        removeUser: (state) => {
            state._id = "";
            state.email = "";
            state.name = "";
            state.phone = "";
            state.role = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;