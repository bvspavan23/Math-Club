import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        // clubEves: [    
        //     { eventid: '1', eventname: "QUICK-BUZZ",startdate:"11-11-2024",enddate:"12-11-2024",description:"abcd",venue:"Seminar Hall",eligibility:"1st Years"},
        //     { eventid: '2', eventname: "PATTERN-PRINTING",startdate:"23-11-2024",enddate:"24-11-2024",description:"",venue:"DA Lab",eligibility:"2nd Years" },
        //     { eventid: '3', eventname: "CODE-WARRIORS",startdate:"",enddate:"",description:"",venue:"",eligibility:"" },
        //     { eventid: '4', eventname: "HACK-A-THON",startdate:"",enddate:"",description:"",venue:"",eligibility:"" },
        // ],
        clubEves: [],
    },

    reducers: {
        seteveAction: (state, action) => {
            state.clubEves = action.payload;
        },
        addeveAction: (state, action) => {
            state.clubEves.push({
                eventid: action.payload.eventid,
                eventname: action.payload.eventname,
                startdate: action.payload.startdate,
                enddate: action.payload.enddate,
                description: action.payload.description,
                venue: action.payload.venue,
                eligibility: action.payload.eligibility
            });
        },
        removeeveAction: (state, action) => {
            state.clubEves = state.clubEves.filter((event) => event.eventid !== action.payload);
            const delEvent = action.payload;
            axios.delete(`http://localhost:8000/api/v1/events/${delEvent}`).then((response) => {
                console.log("Event removed from db",response.data);                
            }).catch((error) => {
                console.log(error);                
            })
        },

        updateeveAction: (state, action) => {
            state.clubEves = state.clubEves.map((event) => {
                if (event.eventid === action.payload.eventid) {
                    return {
                        ...event,
                        eventname: action.payload.eventname,
                        startdate: action.payload.startdate,
                        enddate: action.payload.enddate,
                        description: action.payload.description,
                        venue: action.payload.venue,
                        eligibility: action.payload.eligibility,
                    };
                }
                return event;
            });

        },
    
    },
});

export const eventlistApi = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/events");
        dispatch(seteveAction(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const { seteveAction, addeveAction, removeeveAction, updateeveAction } = eventSlice.actions;
export const EventList = (state) => state.event.clubEves;
export default eventSlice.reducer;
