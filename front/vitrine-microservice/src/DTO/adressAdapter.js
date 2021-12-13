module.exports = function (addressData) {
    return {
        streetNumber: addressData.street_number,
        route: addressData.route,
        locality: addressData.locality,
        administrativeAreaLevel2: addressData.administrative_area_level_2,
        administrativeAreaLevel1: addressData.administrative_area_level_1,
        country: addressData.country,
        postalCode: addressData.postal_code,
        latitude: addressData.latitude,
        longitude: addressData.longitude

    }
}
