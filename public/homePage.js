const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
        ApiConnector.logout((exit) => {
            if (exit.success) {
                location.reload();
            }
        }
        );
}

profileWidget = new ProfileWidget();

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
    setInterval(getCurrency, 60000);
};

getCurrency();

moneyForm = new MoneyManager();

moneyForm.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (f) => {
        if (f.success) {
            ProfileWidget.showProfile(f.data);
        } else {
            moneyForm.setMessage(f.success, f.error);
        }
    })
}

moneyForm.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (f) => {
        if (f.success) {
            ProfileWidget.showProfile(f.data);
        } else {
            moneyForm.setMessage(f.success, f.error);
        }
    })
}


moneyForm.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (f) => {
        if (f.success) {
            ProfileWidget.showProfile(f.data);
        } else {
            moneyForm.setMessage(f.success, f.error);
        }
    }) 
}

favoritesTableBody = new FavoritesWidget;

ApiConnector.getFavorites((favorites) => {
    if (favorites.success) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(favorites.data);
        moneyForm.updateUsersList(favorites.data);
    }
});

favoritesTableBody.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (f) => {
        if (f.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(f.data);
            moneyForm.updateUsersList(f.data);
        } else {
            favoritesTableBody.setMessage(f.error);
        }
    })
}

favoritesTableBody.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (f) => {
        if (f.success) {
            favoritesTableBody.clearTable();
            favoritesTableBody.fillTable(f.data);
            moneyForm.updateUsersList(f.data);
        } else {
            favoritesTableBody.setMessage(f.error);
        }
    })
}
