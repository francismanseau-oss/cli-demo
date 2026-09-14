(function () {
    var STORAGE_KEY = "cli-demo-theme";
    var VALID = { auto: true, day: true, night: true };
    var QUEBEC_TZ = "America/Toronto";

    function getStored() {
        var value = localStorage.getItem(STORAGE_KEY);
        return VALID[value] ? value : "auto";
    }

    function getQuebecHour() {
        var parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: QUEBEC_TZ,
            hour: "numeric",
            hour12: false
        }).formatToParts(new Date());
        var hourPart = parts.find(function (part) {
            return part.type === "hour";
        });
        return hourPart ? parseInt(hourPart.value, 10) : 0;
    }

    function resolveEffective(mode) {
        if (mode === "day") return "day";
        if (mode === "night") return "night";
        var hour = getQuebecHour();
        return hour >= 6 && hour < 20 ? "day" : "night";
    }

    function updateMetaThemeColor(effective) {
        var meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) return;
        meta.setAttribute("content", effective === "day" ? "#f7f9fc" : "#0a0e1a");
    }

    function apply(mode) {
        var effective = resolveEffective(mode);
        document.documentElement.setAttribute("data-theme", mode);
        document.documentElement.setAttribute("data-theme-effective", effective);
        updateMetaThemeColor(effective);
    }

    apply(getStored());
})();
