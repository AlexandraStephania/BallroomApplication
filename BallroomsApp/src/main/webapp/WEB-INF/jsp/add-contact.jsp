<%@ include file="header.jsp" %>
<!-- Page content (Begin)  -->

	<h1>Add Contact</h1>
	<form:form method="post" modelAttribute="contact">
		
		<table>
			<tr>
				<td><form:label path="email">Email</form:label></td>
				<td><form:input path="email" /></td>
				<td><form:errors path="email" cssClass="error" /></td>
			</tr>
			<tr>
				<td><form:label path="telephone">Phone</form:label></td>
				<td><form:input path="telephone" /></td>
				<td><form:errors path="telephone" cssClass="error" /></td>
			</tr>
			<tr>
				<td><form:label path="address">Address</form:label></td>
				<td><form:input path="address" /></td>
				<td><form:errors path="address" cssClass="error" /></td>
			</tr>
			<tr>
				<td><form:label path="site">Site</form:label></td>
				<td><form:input path="site" /></td>
				<td><form:errors path="site" cssClass="error" /></td>
			</tr>
			<tr><td colspan="4" align="right"><input  type="submit" value="Add" /></td></tr>
		</table>
		<form:errors path="*" cssClass="errorblock" element="div" />
	</form:form>

<!-- Page content (End)    -->
<%@ include file="footer.jsp" %>