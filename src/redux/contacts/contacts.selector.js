import { createSelector } from "reselect";
import { GENDER } from "../../constants/gender";
import { NATIONALITIES } from "../../constants/nationalities";
import { isEmpty } from '../../utils/isObjEmpty'

const getContacts = (state) => {
    return state.contacts.contacts;
};
const getVisibilityFilter = (state) => state.contacts.visibilityFilter;

export const selectContacts = createSelector(
    [getContacts],
    (contacts) => contacts.results
);

const genderStatistics = {};
const calculateStatistics = (data, statisticData) => {
    Object.entries(statisticData).forEach(([key, value]) => {
        const result = data.filter((contact) => contact.gender === value);
        genderStatistics[value] = result.length;
    });
};

const nationStatistics = {};
const calculateNationalities = (data, statisticData) => {
    Object.entries(statisticData).forEach(([key, value]) => {
        const result = data.filter((contact) => contact.nat === key);
        nationStatistics[value.name] = result.length;
    });
};

export const selectStatistics = createSelector([getContacts], (contacts) => {
    if (contacts.results) {
        calculateStatistics(contacts.results, GENDER);
        calculateNationalities(contacts.results, NATIONALITIES);
        return {
            size: contacts.results.length,
            gender: genderStatistics,
            nat: nationStatistics,
        };
    }
});

export const selectVisibleContacts = createSelector(
    [getVisibilityFilter, selectContacts],
    (visibilityFilter, contacts) => {
        if (isEmpty(visibilityFilter)) {
            return contacts;
        } else {
            return contacts.filter((contact) => {
                return Object.keys(visibilityFilter).every(key => contact[key] === visibilityFilter[key])
            })
        }
    }
);
