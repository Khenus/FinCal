package com.example.fincal;

public class Entries {
    private String type, description, amt, createdAt;

    public Entries(String type, String description, String amt, String createdAt) {
        this.type = type;
        this.description = description;
        this.amt = amt;
        this.createdAt = createdAt;
    }

    public String printAllVals(){
        String retVal;

        retVal = this.type + this.description + this.amt + this.createdAt;

        return retVal;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAmt() {
        return amt;
    }

    public void setAmt(String amt) {
        this.amt = amt;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
