const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
        ApiConnector.logout((exit) => {
            if (exit.success) {
                location.reload();
            }
        }
        );
}

ApiConnector.current((profile) => {
    if (profile.success) {
        ProfileWidget.showProfile(profile.data);
    }
});

const tableBody = new RatesBoard();

function getCurrency() {
    ApiConnector.getStocks((stocks) => {
        if (stocks.success) {
            tableBody.clearTable();
            tableBody.fillTable(stocks.data);
        }
    });
    //setInterval(getCurrency, 60000);
};

getCurrency();

addMoneyForm = new MoneyManager();

addMoneyForm.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (f) => {
        if (f.success) {
            addMoneyForm.showProfile();
        } else {
            addMoneyForm.setMessage(f.success, f.error);
        }
    })
}

conversionMoneyForm = new MoneyManager();

conversionMoneyForm.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (f) => {
        if (f.success) {
            conversionMoneyForm.showProfile();
        } else {
            conversionMoneyForm.setMessage(f.success, f.error);
        }
    })
}

sendMoneyForm = new MoneyManager();


sendMoneyForm.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (f) => {
        if (f.success) {
            sendMoneyForm.showProfile();
        } else {
            sendMoneyForm.setMessage(f.success, f.error);
        }
    }) 
}

favoritesTableBody = new FavoritesWidget;

ApiConnector.getFavorites((favorites) => {
    if (favorites.success) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(favorites.data);
        favoritesTableBody.updateUsersList(favorites.data);
    }
});

favoritesTableBody.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (f) => {
        if (f.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(favorites.data);
            favoritesTableBody.updateUsersList(favorites.data);
        } else {
            favoritesTableBody.setMessage(f.error);
        }
    })
}

favoritesTableBody.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (f) => {
        if (f.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(favorites.data);
            favoritesTableBody.updateUsersList(favorites.data);
        } else {
            favoritesTableBody.setMessage(f.error);
        }
    })
}
