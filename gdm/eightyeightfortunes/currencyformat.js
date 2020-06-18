  var currencyFormat;
 (function (currencyFormat) {
    var CurrencyFormat = (function () {
		
        var currencyCodeMap = {
          'AED': '\u062F\u002e\u0625',
          'ARS': '$',
          'AUD': '$',
          'BDT': '\u09F3',
          'BRL': 'R$',
          'CAD': '$',
          'CHF': 'Fr.',
          'CLP': '$',
          'CNY': '\u00a5',
          'COP': '$',
          'CRC': '\u20a1',
          'CUP': '$',
          'CZK': 'K\u010d',
          'DKK': 'kr',
          'DOP': '$',
          'EGP': '\u00a3',
          'EUR': '\u20ac',
          'GBP': '\u00a3',
          'HKD': '$',
          'HRK': 'kn',
          'HUF': 'Ft',
          'IDR': 'Rp',
          'ILS': '\u20AA',
          'INR': 'Rs',
          'IQD': '\u0639\u062F',
          'ISK': 'kr',
          'JMD': '$',
          'JPY': '\u00a5',
          'KRW': '\u20A9',
          'KWD': '\u062F\u002e\u0643',
          'LKR': 'Rs',
          'LVL': 'Ls',
          'MNT': '\u20AE',
          'MXN': '$',
          'MYR': 'RM',
          'NOK': 'kr',
          'NZD': '$',
          'PAB': 'B/.',
          'PEN': 'S/.',
          'PHP': 'P',
          'PKR': 'Rs.',
          'PLN': 'z\u0142',
          'RON': 'L',
          'RUB': '\u0440\u0443\u0431',
          'SAR': '\u0633\u002E\u0631',
          'SEK': 'kr',
          'SGD': '$',
          'SKK': 'Sk',
          'SYP': 'SYP',
          'THB': '\u0e3f',
          'TRY': 'TL',
          'TWD': 'NT$',
          'USD': '$',
          'UYU': '$',
          'VEF': 'Bs.F',
          'VND': '\u20AB',
          'XAF': 'FCFA',
          'XCD': '$',
          'YER': 'YER',
          'ZAR': 'R'
        };
		
		CurrencyFormat.DEFAULT_FORMAT = {
            name: "",
            symbol: "",
            exchangeRate: 1,
            grouping: 3,
            groupingSeparator: ",",
            fractionalDigits: 2,
            fractionalSeparator: ".",
            currencyCodeSpacing: 1,
            currencyCodeBeforeAmount: true,
            currencySymbolSpacing: 1,
            currencySymbolBeforeAmount: true,
			currencyMultiplier: 1
        };
		
        function CurrencyFormat(currency, locale) 
		{
			this.format = CurrencyFormat.DEFAULT_FORMAT;
			this.format.name = currency;
			this.format.symbol = this.getSymbolForCurrency(currency);
			this.format.fractionalSeparator = this.getCurrencySeparator(locale, 'decimal');
			this.format.groupingSeparator = this.getCurrencySeparator(locale, 'group');
			this.format.currencyMultiplier = this.getBetMultiplierForCurrency(currency);
		}
		
		CurrencyFormat.prototype.getBetMultiplierForCurrency = function (currency) 
		{	
			if (currency == "EUR") return 1;
			if (currency == "PLN") return 5;
			if (currency == "CHF") return 1;
			if (currency == "TRY") return 2;
			if (currency == "YTL") return 2;
			if (currency == "USD") return 1;
			if (currency == "CZK") return 20;
			if (currency == "RON") return 5;
			if (currency == "HUF") return 300;
			if (currency == "RUB") return 40;
			if (currency == "HRK") return 10;
			if (currency == "EEK") return 15;
			if (currency == "LVL") return 1;
			if (currency == "LTL") return 5;
			if (currency == "BGN") return 2;
			if (currency == "GBP") return 1;
			if (currency == "DKK") return 10;
			if (currency == "NOK") return 10;
			if (currency == "SEK") return 10;
			if (currency == "ARS") return 5;
			if (currency == "CAD") return 1;
			if (currency == "HKD") return 10;
			if (currency == "SGD") return 1;
			if (currency == "AUD") return 1;
			if (currency == "NZD") return 1;
			if (currency == "BRL") return 2;
			if (currency == "MYR") return 5;
			if (currency == "CNY") return 10;
			if (currency == "ZAR") return 10;
			if (currency == "MXN") return 20;
			if (currency == "THB") return 40;
			if (currency == "INR") return 50;
			if (currency == "JPY") return 100;
			if (currency == "ISK") return 200;
			if (currency == "TWD") return 40;
			if (currency == "PEN") return 4;
			return 1;
		};	

		CurrencyFormat.prototype.getDefaultCountryForCurrency = function (currency)
		{
			if (currency == "EUR") return "DE";
			if (currency == "PLN") return "PL";
			if (currency == "CHF") return "CH";
			if (currency == "TRY") return "TR";
			if (currency == "YTL") return "TR";
			if (currency == "USD") return "US";
			if (currency == "CZK") return "CZ";
			if (currency == "RON") return "RO";
			if (currency == "HUF") return "HU";
			if (currency == "RUB") return "RU";
			if (currency == "HRK") return "HR";
			if (currency == "EEK") return "EE";
			if (currency == "LVL") return "LV";
			if (currency == "LTL") return "LT";
			if (currency == "BGN") return "BG";
			if (currency == "GBP") return "GB";
			if (currency == "DKK") return "DK";
			if (currency == "NOK") return "NO";
			if (currency == "SEK") return "SE";
			if (currency == "ARS") return "AR";
			if (currency == "CAD") return "CA";
			if (currency == "SGD") return "SG";
			if (currency == "HKD") return "HK";
			if (currency == "AUD") return "AU";
			if (currency == "NZD") return "NZ";
			if (currency == "BRL") return "BR";
			if (currency == "MYR") return "MY";
			if (currency == "CNY") return "CN";
			if (currency == "ZAR") return "ZA";
			if (currency == "MXN") return "MX";
			if (currency == "THB") return "TH";
			if (currency == "INR") return "IN";
			if (currency == "JPY") return "JP";
			if (currency == "ISK") return "IS";
			if (currency == "TWD") return "TW";
			if (currency == "PEN") return "PE";			
		};
		CurrencyFormat.prototype.getSymbolForCurrency = function (currency)
		{
			return currencyCodeMap[currency];
		};
		
		CurrencyFormat.prototype.getCurrencySeparator = function (locale, separatorType)
		{
			const numberWithGroupAndDecimalSeparator = 1000.1;
			return Intl.NumberFormat(locale)
				.formatToParts(numberWithGroupAndDecimalSeparator)
				.find(part => part.type === separatorType)
				.value;		
		};
		
		return CurrencyFormat;
    }());
    currencyFormat.CurrencyFormat = CurrencyFormat;
})(currencyFormat || (currencyFormat = {}));

var stringutil;
(function (stringutil) {
    var CurrencyFormatter = (function () {
        function CurrencyFormatter(currencyCode, currencySymbol, grouping, groupingSeparator, fracDigits, decimalSeparator, codeBeforeAmount, currencyCodeSpacing, symbolBeforeAmount, currencySymbolSpacing) {
            this.setFormatting(currencyCode, currencySymbol, grouping, groupingSeparator, fracDigits, decimalSeparator, codeBeforeAmount, currencyCodeSpacing, symbolBeforeAmount, currencySymbolSpacing);
        }
        CurrencyFormatter.prototype.setFormatting = function (currencyCode, currencySymbol, grouping, groupingSeparator, fracDigits, decimalSeparator, codeBeforeAmount, currencyCodeSpacing, symbolBeforeAmount, currencySymbolSpacing) {
            this.currencyCode = currencyCode;
            this.currencySymbol = currencySymbol;
            this.grouping = grouping;
            this.groupingSeparator = groupingSeparator;
            this.fracDigits = fracDigits;
            this.decimalSeparator = decimalSeparator;
            this.codeBeforeAmount = codeBeforeAmount;
            this.currencyCodeSpacing = currencyCodeSpacing;
            this.symbolBeforeAmount = symbolBeforeAmount;
            this.currencySymbolSpacing = currencySymbolSpacing;
        };
        CurrencyFormatter.prototype.getCurrencyCode = function () {
            return this.currencyCode;
        };
        CurrencyFormatter.prototype.getCurrencySymbol = function () {
            return this.currencySymbol;
        };
        CurrencyFormatter.prototype.getGrouping = function () {
            return this.grouping;
        };
        CurrencyFormatter.prototype.getGroupingSeparator = function () {
            return this.groupingSeparator;
        };
        CurrencyFormatter.prototype.getFracDigits = function () {
            return this.fracDigits;
        };
        CurrencyFormatter.prototype.getDecimalSeparator = function () {
            return this.decimalSeparator;
        };
        CurrencyFormatter.prototype.getCodeBeforeAmount = function () {
            return this.codeBeforeAmount;
        };
        CurrencyFormatter.prototype.getCurrencyCodeSpacing = function () {
            return this.currencyCodeSpacing;
        };
        CurrencyFormatter.prototype.getSymbolBeforeAmount = function () {
            return this.symbolBeforeAmount;
        };
        CurrencyFormatter.prototype.getCurrencySymbolSpacing = function () {
            return this.currencySymbolSpacing;
        };
        CurrencyFormatter.prototype.format = function (cents) {
            var result = "";
            var isNegative = false;
            if (cents < 0) {
                isNegative = true;
                cents = Math.abs(cents);
            }
            result = this.formatCentsToFractional(cents);
            result = this.formatGrouping(result);
            if (isNegative) {
                result = "-" + result;
            }
            result = this.addCurrencySymbolOrCode(result);
            return result;
        };
        CurrencyFormatter.prototype.formatGrouping = function (input) {
            // less or equal to zero is none
            if (this.grouping <= 0) {
                return input;
            }
            // find the fraction serparator or use end
            var fractionSeparatorIndex = input.lastIndexOf(this.decimalSeparator);
            if (fractionSeparatorIndex == -1) {
                fractionSeparatorIndex = input.length;
            }
            //get the fraction
            var output = input.substring(fractionSeparatorIndex);
            // walk backwards and add grouping separator
            var j = 0;
            for (var i = fractionSeparatorIndex - 1; i >= 0; i--) {
                j++;
                output = input.charAt(i) + output;
                // add a separator if not first
                if ((i != 0) && (j % this.grouping == 0)) {
                    output = this.groupingSeparator + output;
                }
            }
            return output;
        };
        CurrencyFormatter.prototype.formatCentsToFractional = function (cents) {
            // the exchange rate between cents and dollars is always 100
            var str = cents.toString();
            //pad with leading zeros
            while (str.length < 3) {
                str = "0" + str;
            }
            // get fraction and remainder
            // remember that it is always the two last digits that are fraction
            // since the string padded with leading zeros 000, 001, 010, 100... at least
            var fraction = str.substr(str.length - 2, this.fracDigits);
            var remainder = str.substr(0, str.length - 2);
            if (remainder == "") {
                remainder = "0";
            }
            // remove leading zeros from remainder
            for (var i = 0; i < remainder.length - 1; i++) {
                if (remainder.charAt(0) != "0") {
                    break;
                }
                remainder = remainder.substr(1);
            }
            // early exis if no fraction digits should be displayed
            if (this.fracDigits == 0) {
                return remainder;
            }
            // padd with zeros
            while (fraction.length < this.fracDigits) {
                fraction = fraction + "0";
            }
            // add decimal separator
            var result = remainder + this.decimalSeparator + fraction;
            return result;
        };
        CurrencyFormatter.prototype.addCurrencySymbolOrCode = function (input) {
            var realmoney = window['urlParms'] == null || window['urlParms'].indexOf('realmoney=true') > -1;
            // symbol first, then code then nothing
            if (realmoney && this.currencySymbol && this.currencySymbol != "") {
                return this.addCurrencySymbol(input);
            }
            else if (realmoney && this.currencyCode && this.currencyCode != "") {
                return this.addCurrencyCode(input);
            }
            else {
                return input;
            }
        };
        CurrencyFormatter.prototype.addCurrencySymbol = function (input) {
            var spacing = "";
            //  add spacing
            for (var i = 0; i < this.currencySymbolSpacing; i++) {
                spacing += " ";
            }
            if (this.symbolBeforeAmount) {
                input = this.currencySymbol + spacing + input;
            }
            else {
                input = input + spacing + this.currencySymbol;
            }
            return input;
            //return this.addCurrencyCode(input);
        };
        CurrencyFormatter.prototype.addCurrencyCode = function (input) {
            var spacing = "";
            //  add spacing
            for (var i = 0; i < this.currencyCodeSpacing; i++) {
                spacing += " ";
            }
            if (this.codeBeforeAmount) {
                input = this.currencyCode + spacing + input;
            }
            else {
                input = input + spacing + this.currencyCode;
            }
            return input;
        };
        return CurrencyFormatter;
    }());
    stringutil.CurrencyFormatter = CurrencyFormatter;
})(stringutil || (stringutil = {}));

var stringutil;
(function (stringutil) {
    var CurrencyFormatterFactory = (function () {
        function CurrencyFormatterFactory() {
        }
        CurrencyFormatterFactory.prototype.createCurrencyFormatter = function (currencyCode, currencySymbol, grouping, groupingSeparator, fracDigits, decimalSeparator, codeBeforeAmount, currencyCodeSpacing, symbolBeforeAmount, currencySymbolSpacing) {
            return new stringutil.CurrencyFormatter(currencyCode, currencySymbol, grouping, groupingSeparator, fracDigits, decimalSeparator, codeBeforeAmount, currencyCodeSpacing, symbolBeforeAmount, currencySymbolSpacing);
        };
        CurrencyFormatterFactory.prototype.createUninitialiedCurrencyFormatter = function () {
            return new stringutil.CurrencyFormatter("?", "?", 1, ".", 2, ",", true, 1, true, 1);
        };
        return CurrencyFormatterFactory;
    }());
    stringutil.CurrencyFormatterFactory = CurrencyFormatterFactory;
})(stringutil || (stringutil = {}));