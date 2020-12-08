import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = {"/products"})
public class products extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        PrintWriter out = response.getWriter();
        String reltn = request.getParameter("reltn");
        String gender = request.getParameter("gender");
        String age = request.getParameter("age");
        String sign = request.getParameter("sign");
        String category = "";
        String color = "";
        String[] first_grp = {"barbie doll", "mug", "kindle", "casual wear", "shoes", "swipe baby phone"};
        String[] second_grp = {"table light", "casual wear", "shoes", "perfume", "watch", "t-shirt", "pen", "fitbit", "colour set", "kindle", "gift card", "chess board"};
        String[] third_grp = {"rubix cube", "shoes", "casual wear", "pendants", "headphones", "sudoku puzzle", "table light", "books", "sticky notes", "diary set", "novels", "science fiction novels", "painting pallette", "t-shirt", "chess board", "camera"};
        String[] fourth_grp = {"semiprecious birth stone", "jewellery", "casual wear", "shoes", "saree", "voucher cards", "weekly planner", "wallet", "novels", "luggage bag", "ring", "t-shirt"};
        String[] fifth_grp = {"caricature", "personalised cushion", "fitbit", "wooden desk organizer", "casual wear", "t-shirt", "mug", "sceneries", "shoes", "jacket", "hat"};
        String[] age_grp = new String[30];
        String[] first_gen = {"selfie stick", "camera", "watch", "sunglasses", "rubix cube", "sudoku puzzle", "casual wear", "headphones", "gadgets", "fitbit", "gift card", "hat", "tool set", "pen", "wooden desk organizer", "perfume", "gym set", "chess board", "caricature", "wine bottles"};
        String[] second_gen = {"semiprecious birth stone", "luggage bag", "photo case", "beauty products", "ring", "saree", "watch", "earrings", "casual wear", "perfume", "pendants", "jewellery", "wine bottles", "books", "diary set", "sunglasses", "headphones", "gift card", "personalised cushion", "hat", "selfie stick"};
        String[] gender_grp = new String[30];
        String[] all = new String[20];
        List<String> col = new ArrayList<>();
        
        //SQL quiry to create table "sorted_prod"
//CREATE TABLE SORTED_PROD (ZODIAC VARCHAR(20) NOT NULL, COLOUR_PREF VARCHAR(100) NOT NULL, NUM_PREF VARCHAR(50) NOT NULL, CATEGORY VARCHAR(100) NOT NULL, PRIMARY KEY (ZODIAC));
        switch (age) {
            case "0-4":
                age_grp = first_grp;
                break;
            case "5-12":
                age_grp = second_grp;
                break;
            case "13-25":
                age_grp = third_grp;
                break;
            case "26-50":
                age_grp = fourth_grp;
                break;
            case "50+":
                age_grp = fifth_grp;
                break;
        }
        
        switch (gender) {
            case "male":
                gender_grp = first_gen;
                break;
            case "female":
                gender_grp = second_gen;
                break;
        }
            response.setContentType("text/html");
        
        try{
            
            Connection con = null;
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            con = DriverManager.getConnection("jdbc:derby://localhost:1527/sample", "app", "app");
            PreparedStatement pst = null;
            
            String q = "Select * from sorted_prod where zodiac=?";
            pst = con.prepareStatement(q);
            pst.setString(1, sign);
            ResultSet rs = pst.executeQuery();
            if(rs.next()){
                category = rs.getString("category");
                color = rs.getString("colour_pref");
            }
            pst.close();
            con.close();
            System.out.println(category);
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex);
        }
        
        int ind = 0, start = 0;
        
        for(int i = 0; i < category.length(); i++){
            if(category.charAt(i) == ','){
                all[ind++] = category.substring(start, i);/////
                start = i + 2;
            }
        }
        
        all[ind++] = category.substring(start, category.length());
        start = 0;
        
        for(int i = 0; i < color.length(); i++){
            if(color.charAt(i) == ','){
               col.add(color.substring(start, i));/////
                start = i + 2;
            }
        }
        col.add(color.substring(start, color.length()));
        
        HashSet<String> set = new HashSet<>(); 
     
        set.addAll(Arrays.asList(all));

        set.retainAll(Arrays.asList(age_grp));

        set.retainAll(Arrays.asList(gender_grp));
        System.out.println(set);
        List<String> list = new ArrayList<>(set);
        
        HttpSession session = request.getSession();
        session.setAttribute("prod", list);
        session.setAttribute("color", col);

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
