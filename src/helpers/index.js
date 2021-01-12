export const specialCases = (country)=>{
    switch(country){
        case 'Anguilla':
            return 'uk/anguilla'
        case 'Aruba':
            return 'netherlands/aruba'
        case 'Bermuda':
            return 'uk/bermuda'
        case 'British Virgin Islands':
            return 'uk/british virgin islands'
        case 'Cayman Islands':
            return 'uk/cayman islands'
        case 'Channel Islands':
            return 'uk/channel islands'
        case 'Curaçao':
            return 'netherlands/curacao'
        case 'Falkland Islands (Malvinas)':
            return 'uk/falkland islands (malvinas)'
        case 'Faroe Islands':
            return 'denmark/faroe islands'
        case 'French Guiana':
            return 'france/french guiana'
        case 'French Polynesia':
            return 'france/french polynesia'
        case 'Gibraltar':
            return 'uk/gibraltar'
        case 'Greenland':
            return 'denmark/greenland'
        case 'Guadeloupe':
            return 'france/guadeloupe'
        case 'Holy See (Vatican City State)':
            return 'holy see'
        case 'Hong Kong':
            return 'china/hong kong'
        case 'Isle of Man':
            return 'uk/isle of man'
        case 'Macao':
            return 'china/macau'
        case 'Martinique':
            return 'france/martinique'
        case 'Mayotte':
            return 'france/mayotte'
        case 'Montserrat':
            return 'uk/montserrat'
        case 'New Caledonia':
            return 'france/new caledonia'
        case 'Réunion':
            return 'france/reunion'
        case 'Saint Pierre Miquelon':
            return 'france/saint pierre and miquelon'
        case 'Sint Maarten':
            return 'netherlands/sint maarten'
        case 'St. Barth':
            return 'france/saint barthelemy'
        case 'Turks and Caicos Islands':
            return 'uk/turks and caicos islands'
        case 'Wallis and Futuna':
            return 'france/wallis and futuna'
        default:
            return country
    }
}